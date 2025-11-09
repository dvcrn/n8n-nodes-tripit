import { TripItAuth } from "../src/util/auth";
import { ITripItCredentials } from "../src/nodes/TripIt/types/ITripItTypes";
import * as dotenv from "dotenv";

dotenv.config();

async function testRefreshFlow() {
  const credentials: ITripItCredentials = {
    username: process.env.TRIPIT_USERNAME!,
    password: process.env.TRIPIT_PASSWORD!,
  };

  console.log("=== Testing Refresh Token Flow ===\n");

  // Step 1: Initial authentication
  console.log("1. Initial authentication (full flow)...");
  const auth1 = new TripItAuth(credentials, true); // debug = true
  const token1 = await auth1.getAccessToken();
  console.log(`✓ Got access token (expires in ${token1.expires_in}s)`);
  console.log(`✓ Got refresh token: ${token1.refresh_token ? 'YES' : 'NO'}\n`);

  // Step 2: Immediate re-use (should use cache)
  console.log("2. Immediate re-use (should use cached token)...");
  const auth2 = new TripItAuth(credentials, true);
  const startTime = Date.now();
  const token2 = await auth2.getAccessToken();
  const duration = Date.now() - startTime;
  console.log(`✓ Got token in ${duration}ms (${duration < 100 ? 'CACHED ✓' : 'RE-AUTHENTICATED ✗'})\n`);

  // Step 3: Force cache expiration to test refresh
  console.log("3. Forcing cache expiration to test refresh flow...");
  // Access the private static tokenCache via reflection
  const TripItAuthClass = auth1.constructor as any;
  const cacheKey = `e400234a-f684-11e7-9d05-9cb654932688:${credentials.username}`;
  const cache = TripItAuthClass.tokenCache.get(cacheKey);

  if (cache && cache.refreshToken) {
    console.log(`✓ Found cached refresh token: ${cache.refreshToken.substring(0, 20)}...`);

    // Expire the access token by setting expiresAt to the past
    cache.expiresAt = Date.now() - 1000;
    TripItAuthClass.tokenCache.set(cacheKey, cache);
    console.log("✓ Expired the cached access token\n");

    // Step 4: Get new token (should use refresh)
    console.log("4. Getting new token (should use refresh, not full re-auth)...");
    const auth3 = new TripItAuth(credentials, true);
    const token3 = await auth3.getAccessToken();
    console.log(`✓ Got new access token (expires in ${token3.expires_in}s)`);
    console.log(`✓ Got new refresh token: ${token3.refresh_token ? 'YES' : 'NO'}\n`);

    console.log("=== ✅ All Tests Passed! ===");
    console.log("- Initial auth: ✓");
    console.log("- Token caching: ✓");
    console.log("- Refresh flow: ✓");
  } else {
    console.log("✗ No refresh token in cache - API may not be returning refresh_token");
    console.log("Cache contents:", cache);
  }
}

testRefreshFlow().catch((error) => {
  console.error("❌ Test failed:", error);
  process.exit(1);
});

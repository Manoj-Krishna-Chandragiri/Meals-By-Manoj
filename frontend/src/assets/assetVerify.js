// This is a helper file to verify that assets are being imported correctly

import { assets } from './assets';

// Verify assets are properly loaded
console.log('Asset verification:');
console.log('Logo:', assets.logo ? 'Loaded' : 'Missing');
console.log('Facebook icon:', assets.facebook_icon ? 'Loaded' : 'Missing');
console.log('Twitter icon:', assets.twitter_icon ? 'Loaded' : 'Missing');
console.log('LinkedIn icon:', assets.linkedin_icon ? 'Loaded' : 'Missing');

// Log actual asset paths
console.log('Asset paths:');
console.log('Logo path:', assets.logo);
console.log('Facebook icon path:', assets.facebook_icon);
console.log('Twitter icon path:', assets.twitter_icon);
console.log('LinkedIn icon path:', assets.linkedin_icon);

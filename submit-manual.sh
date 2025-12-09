#!/bin/bash

# Check if build parameter is provided
if [ -z "$1" ]; then
    echo "Usage: $0 <build_path>"
    echo "Example: $0 build-xxx.ipa"
    exit 1
fi

BUILD_PATH="$1"

# Source environment variables from .env.production
source .env.production

# Upload app to App Store
xcrun altool --upload-app -f "$BUILD_PATH" -t ios -u "$APPLE_EMAIL" -p "$APPLE_APP_SPECIFIC_PASSWORD"
#!/bin/sh
# ---------------
# gen sri.py
# ---------------
BLOG_ROOT="../clean_blog"
rm -f "$BLOG_ROOT"/sri.py
echo "HTML5SHIV_SRI="'"'sha256-`cat $BLOG_ROOT/static/js/html5shiv.js | openssl dgst -sha256 -binary | openssl enc -base64`'"' >> "$BLOG_ROOT"/sri.py 
echo "RESPOND_MIN_SRI="'"'sha256-`cat $BLOG_ROOT/static/js/respond.min.js | openssl dgst -sha256 -binary | openssl enc -base64`'"' >> "$BLOG_ROOT"/sri.py
echo "BUNDLE_JS_SRI="'"'sha256-`cat $BLOG_ROOT/static/webpack_bundles/bundle-*.js  | openssl dgst -sha256 -binary | openssl enc -base64`'"' >> "$BLOG_ROOT"/sri.py 
echo "BUNDLE_CSS_SRI="'"'sha256-`cat $BLOG_ROOT/static/webpack_bundles/bundle-*.css | openssl dgst -sha256 -binary | openssl enc -base64`'"' >> "$BLOG_ROOT"/sri.py
echo "PJAX_JS_SRI="'"'sha256-`cat $BLOG_ROOT/static/webpack_bundles/pjax-*.js  | openssl dgst -sha256 -binary | openssl enc -base64`'"' >> "$BLOG_ROOT"/sri.py

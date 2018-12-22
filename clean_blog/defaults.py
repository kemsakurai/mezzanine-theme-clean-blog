from mezzanine.conf import register_setting

###########################
# FOR CLEAN_BLOG SETTINGS #
###########################
register_setting(
    name="TEMPLATE_ACCESSIBLE_SETTINGS",
    description=("Sequence of setting names available within templates."),
    editable=False,
    default=("TWITTER_ACCOUNT_NAME",
             "FACEBOOK_USER_NAME",
             "GITHUB_USER_NAME",
             "CLEAN_BLOG_GOOGLE_ADS_CLIENT_ID",
             "CLEAN_BLOG_GOOGLE_ADS_SLOT_ID",
             "CLEAN_BLOG_FACEBOOK_APP_ID",
             "CLEAN_BLOG_IS_VISIBLE_DESCRIPTION",
             "BUNDLE_JS_SRI",
             "RESPOND_MIN_SRI",
             "BUNDLE_CSS_SRI",
             "HTML5SHIV_SRI",
             "PJAX_JS_SRI",
             "GOOGLE_TAG_MANAGER_ID",
             "USE_GOOGLE_OPTIMIZE"
             ),
    append=True,
)

register_setting(
    name="TWITTER_ACCOUNT_NAME",
    description="Twitter account name SNS link of footer",
    editable=True,
    default="",
)

register_setting(
    name="FACEBOOK_USER_NAME",
    description="Facebook user name SNS link of footer",
    editable=True,
    default="",
)

register_setting(
    name="GITHUB_USER_NAME",
    description="Github user name SNS link of footer",
    editable=True,
    default="",
)

register_setting(
    name="CLEAN_BLOG_GOOGLE_ADS_CLIENT_ID",
    description="GOOGLE ADS CLIENT ID for CLEAN_BLOG",
    editable=True,
    default="",
)

register_setting(
    name="CLEAN_BLOG_GOOGLE_ADS_SLOT_ID",
    description="GOOGLE ADS SLOT ID for CLEAN_BLOG",
    editable=True,
    default="",
)

register_setting(
    name="CLEAN_BLOG_FACEBOOK_APP_ID",
    description="FACEBOOK_APP_ID for CLEAN_BLOG",
    editable=True,
    default="",
)
register_setting(
    name="CLEAN_BLOG_IS_VISIBLE_DESCRIPTION",
    description="flag for CLEAN_BLOG's blog list",
    editable=True,
    default=False,
)
register_setting(
    name="BUNDLE_JS_SRI",
    description="",
    editable=False,
    default="",
)
register_setting(
    name="RESPOND_MIN_SRI",
    description="",
    editable=False,
    default="",
)
register_setting(
    name="BUNDLE_CSS_SRI",
    description="",
    editable=False,
    default="",
)
register_setting(
    name="HTML5SHIV_SRI",
    description="",
    editable=False,
    default="",
)
register_setting(
    name="PJAX_JS_SRI",
    description="",
    editable=False,
    default="",
)
register_setting(
    name="GOOGLE_TAG_MANAGER_ID",
    description="",
    editable=True,
    default="",
)
register_setting(
    name="USE_GOOGLE_OPTIMIZE",
    description="",
    editable=True,
    default=False,
)

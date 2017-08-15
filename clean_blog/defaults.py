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
             "CLEAN_BLOG_GOOGLE_ADS_CLIENT_ID_TOP",
             "CLEAN_BLOG_GOOGLE_ADS_SLOT_ID_TOP",
             "CLEAN_BLOG_GOOGLE_ADS_CLIENT_ID_BOTTOM",
             "CLEAN_BLOG_GOOGLE_ADS_SLOT_ID_BOTTOM",
             "CLEAN_BLOG_FACEBOOK_APP_ID",
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
    name="CLEAN_BLOG_GOOGLE_ADS_CLIENT_ID_BOTTOM",
    description="GOOGLE ADS CLIENT ID for CLEAN_BLOG",
    editable=True,
    default="",
)

register_setting(
    name="CLEAN_BLOG_GOOGLE_ADS_SLOT_ID_BOTTOM",
    description="GOOGLE ADS SLOT ID for CLEAN_BLOG",
    editable=True,
    default="",
)

register_setting(
    name="CLEAN_BLOG_GOOGLE_ADS_CLIENT_ID_TOP",
    description="GOOGLE ADS CLIENT ID for CLEAN_BLOG",
    editable=True,
    default="",
)

register_setting(
    name="CLEAN_BLOG_GOOGLE_ADS_SLOT_ID_TOP",
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

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
             ),
    append=True,
)

register_setting(
    name="TWITTER_ACCOUNT_NAME",
    description="Twitter account name SNS link of footer",
    editable=True,
    default="monotalk_xyz",
)

register_setting(
    name="FACEBOOK_USER_NAME",
    description="Facebook user name SNS link of footer",
    editable=True,
    default="kem.sakurai",
)

register_setting(
    name="GITHUB_USER_NAME",
    description="Github user name SNS link of footer",
    editable=True,
    default="kemsakurai",
)

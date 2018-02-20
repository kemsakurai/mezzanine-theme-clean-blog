from __future__ import unicode_literals

from django.db import models
from push_notifications.models import WebPushDevice
from mezzanine.blog.models import BlogCategory
from django.utils.translation import ugettext_lazy as _

class WebPushCategory(models.Model):	 

	web_push_device = models.ForeignKey(WebPushDevice)

	categories = models.ManyToManyField(BlogCategory,verbose_name=_("Categories"), blank=True, related_name="blogposts")

	class Meta:
		verbose_name = _("WebPush Categories")
		verbose_name_plural = _("Blog posts")
		ordering = ("-publish_date",)


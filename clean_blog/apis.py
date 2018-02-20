from __future__ import absolute_import

from push_notifications.api.rest_framework import WebPushDeviceViewSet
from push_notifications.api.rest_framework import DeviceSerializerMixin
from push_notifications.api.rest_framework import UniqueRegistrationSerializerMixin
from .models import WebPushCategory
from rest_framework.serializers import ModelSerializer


class WebPushDeviceCategoriesSerializer(UniqueRegistrationSerializerMixin, ModelSerializer):
	class Meta(DeviceSerializerMixin.Meta):
		model = WebPushCategory
		fields = (
			"web_push_device","blog_categories",
		)
		#fields = (
		#   "id", "name", "registration_id", "active", "date_created",
		#   "p256dh", "auth", "browser", "application_id", "categories",
		#)
		
class WebPushDeviceCategoriesViewSet(WebPushDeviceViewSet):
	queryset = WebPushCategory.objects.all()
	serializer_class = WebPushDeviceCategoriesSerializer

from __future__ import absolute_import

from push_notifications.api.rest_framework import WebPushDeviceViewSet
from push_notifications.api.rest_framework import WebPushDeviceSerializer
from push_notifications.api.rest_framework import DeviceSerializerMixin
from push_notifications.api.rest_framework import UniqueRegistrationSerializerMixin
from .models import WebPushCategory
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from mezzanine.blog.models import BlogCategory

class WebPushDeviceCategoriesSerializer(UniqueRegistrationSerializerMixin, ModelSerializer):

	web_push_device = WebPushDeviceSerializer()
	
	blog_categories = serializers.SlugRelatedField(many=True, read_only=False, 
		slug_field="title", queryset=BlogCategory.objects.all(), required=True)

	class Meta(DeviceSerializerMixin.Meta):
		model = WebPushCategory
		fields = (
			"web_push_device","blog_categories",
		)

class WebPushDeviceCategoriesViewSet(WebPushDeviceViewSet):
	queryset = WebPushCategory.objects.all()
	serializer_class = WebPushDeviceCategoriesSerializer

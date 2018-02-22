from __future__ import absolute_import

from push_notifications.api.rest_framework import WebPushDeviceViewSet
from push_notifications.api.rest_framework import WebPushDeviceSerializer
from push_notifications.api.rest_framework import DeviceSerializerMixin
from .models import WebPushCategory
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from mezzanine.blog.models import BlogCategory
from push_notifications.models import WebPushDevice

class WebPushDeviceCategoriesSerializer(ModelSerializer):

	web_push_device = WebPushDeviceSerializer(data = {}, required=True)

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

	def create(self, validated_data):
		web_push_device = validated_data.pop('web_push_device')
		result_device = WebPushDevice.object.create(**web_push_device)

		blog_categories = []		
		for blog_category in validated_data.pop('blog_categories'):
			blog_categories.append(BlogCategory.object.get(title=blog_category))
        return WebPushCategory.object.create(web_push_device=result_device, blog_categories=blog_categories)

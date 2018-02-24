from __future__ import absolute_import

from push_notifications.api.rest_framework import WebPushDeviceViewSet
from push_notifications.api.rest_framework import WebPushDeviceSerializer
from push_notifications.api.rest_framework import DeviceSerializerMixin
from .models import WebPushRequestInfo
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from mezzanine.blog.models import BlogPost
from push_notifications.models import WebPushDevice

class WebPushRequestInfoSerializer(ModelSerializer):

	web_push_device = WebPushDeviceSerializer(data = {}, required=True)

	blog_post = serializers.PrimaryKeyRelatedField(many=False, queryset=BlogPost.objects.all(), read_only=False)

	def create(self, validated_data):
		web_push_device = validated_data.pop('web_push_device')
		result_device = WebPushDevice.objects.create(**web_push_device)

		return WebPushRequestInfo.objects.create(web_push_device=result_device, 
			blog_post=BlogPost.objects.get(id=validated_data.pop('blog_post')), ga_id=validated_data.pop('ga_id'))

	class Meta(DeviceSerializerMixin.Meta):
		model = WebPushRequestInfo 
		fields = (
			"web_push_device",
			"blog_post",
			"ga_id"
		)

class WebPushDeviceCategoriesViewSet(WebPushDeviceViewSet):
	queryset = WebPushRequestInfo.objects.all()
	serializer_class = WebPushRequestInfoSerializer

from __future__ import absolute_import

from push_notifications.api.rest_framework import WebPushDeviceViewSet
from push_notifications.api.rest_framework import WebPushDeviceSerializer
from push_notifications.api.rest_framework import DeviceSerializerMixin
from .models import WebPushCategory
from .models import WebPushRequestInfo
from rest_framework.serializers import ModelSerializer
from mezzanine.blog.models import BlogPost
from push_notifications.models import WebPushDevice

class WebPushRequestInfoSerializer(ModelSerializer):

	web_push_device = WebPushDeviceSerializer(data = {}, required=True)

	def create(self, validated_data):
		web_push_device = validated_data.pop('web_push_device')
		result_device = WebPushDevice.objects.create(**web_push_device)

		return WebPushRequestInfo.objects.create(web_push_device=result_device, 
			blog_post=BlogPost.objects.get(validated_data.pop('blog_post_id')), ga_id=validated_data.pop('ga_id'))

	class Meta(DeviceSerializerMixin.Meta):
		model = WebPushCategory
		fields = (
			"web_push_device"
		)

class WebPushDeviceCategoriesViewSet(WebPushDeviceViewSet):
	queryset = WebPushRequestInfoSerializer.objects.all()
	serializer_class = WebPushRequestInfoSerializer

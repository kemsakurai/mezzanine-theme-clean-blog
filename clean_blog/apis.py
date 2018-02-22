from __future__ import absolute_import

from push_notifications.api.rest_framework import WebPushDeviceViewSet
from push_notifications.api.rest_framework import WebPushDeviceSerializer
from push_notifications.api.rest_framework import DeviceSerializerMixin
from push_notifications.api.rest_framework import UniqueRegistrationSerializerMixin
from .models import WebPushCategory
from rest_framework import status
from rest_framework.serializers import ModelSerializer
from rest_framework.decorators import detail_route
from mezzanine_api.serializers import CategorySerializer
from mezzanine.blog.models import BlogCategory
from rest_framework.response import Response


class WebPushDeviceCategoriesSerializer(UniqueRegistrationSerializerMixin, ModelSerializer):
	
	web_push_device = WebPushDeviceSerializer()
	
	blog_categories = CategorySerializer(many=True)

	class Meta(DeviceSerializerMixin.Meta):
		model = WebPushCategory
		fields = (
			"web_push_device","blog_categories",
		)

class WebPushDeviceCategoriesViewSet(WebPushDeviceViewSet):
	queryset = WebPushCategory.objects.all()
	serializer_class = WebPushDeviceCategoriesSerializer
    
	@detail_route(methods=['post'])
	def regist(self, request, pk=None):
		# Json で取得できる
		categories = request.data["categories"]
		web_push_device_categories = self.get_object()
		serializer = WebPushDeviceSerializer(request.data["webPushDevice"])
		blog_category_serializers = []
		if serializer.is_valid():
			web_push_device_categories.set_web_push_device(serializer.data)
			# Category の取得
			for category in categories:
				blog_category = BlogCategory.objects.get(name=category.name)
				blog_category_serializer = CategorySerializer(blog_category)
				blog_category_serializers.append(blog_category_serializer)
			# 登録
			web_push_device_categories.set_blog_categories(blog_category_serializers)
			web_push_device_categories.save()
			return Response({'status': 'OK'})
		else:
			return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

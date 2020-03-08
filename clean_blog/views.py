from django.shortcuts import render
from django.views.generic import TemplateView
from mezzanine.blog.models import BlogCategory
from mezzanine.blog.models import BlogPost
from django import template

# Create your views here.
class CategoriesView(TemplateView):
    template_name = "pages/categories.html"
 
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        categories = BlogCategory.objects.all()
        category_posts_rel = {}
        for category in categories:
           posts = BlogPost.objects.filter(categories=category)
           category_posts_rel.update({category: posts})
        context['category_posts_rel'] = category_posts_rel
        return context


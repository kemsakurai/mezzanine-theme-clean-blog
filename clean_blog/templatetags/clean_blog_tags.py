from __future__ import absolute_import, division, unicode_literals

from mezzanine import template

from mezzanine.blog.models import BlogPost, BlogCategory
from mezzanine.conf import settings
from django.contrib.sites.shortcuts import get_current_site


import json

register = template.Library()


@register.filter
def to_amp_url(url):
    if settings.USE_AMP:
        return url.replace("/blog/", "/amp/blog/")
    else:
        return url

@register.inclusion_tag("includes/pagination_prev_next.html", takes_context=True)
def pagination_prev_next_for(context, current_page, page_var="page", exclude_vars=""):
    querystring = context["request"].GET.copy()
    exclude_vars = [v for v in exclude_vars.split(",") if v] + [page_var]
    for exclude_var in exclude_vars:
        if exclude_var in querystring:
            del querystring[exclude_var]
    querystring = querystring.urlencode()
    return {
        "current_page": current_page,
        "querystring": querystring,
        "page_var": page_var,
    }

@register.as_tag
def blog_categories_ex():
    """
    Put a list of categories for blog posts into the template context.
    """
    posts = BlogPost.objects.published()
    categories = BlogCategory.objects.filter(blogposts__in=posts)
    from collections import Counter
    counter = Counter(categories)
    return counter.most_common()

@register.simple_tag(takes_context=True)
def conv_blog_post_to_json_ld(context, blog=None):
    """
    Get blogpost JSON-LD
    """
    request = context['request']
    domain_root = _get_request_root_url(request)
    featured_image = blog.featured_image
    if featured_image:
        featured_image_url = featured_image.url
    else:
        featured_image_url = settings.SITE_LOGO_IMG_URL
    result_dict = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "author": {"@type": "Person", "name": blog.user.first_name},
        "publisher": {"@type": "Organization",
                      "url": domain_root,
                      "name": blog.user.first_name,
                      "logo": {"@type": "ImageObject",
                               "url": settings.SITE_LOGO_IMG_URL}
        },
        "image": {"@type": "ImageObject",
                  "url": featured_image_url, "height": 450,
                  "width": 800},
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": blog.get_absolute_url_with_host(),
        },
        "genre": ' '.join(map(lambda n: n.title, blog.categories.all())),
        "wordcount": str(len(blog.content)),
        "numberOfPunctuation": str(blog.content.count('、') + blog.content.count('。')),
        "datePublished": str(blog.publish_date),
        "dateCreated": str(blog.created),
        "dateModified": str(blog.updated),
        "description": blog.description
    }
    json_o = json.dumps(result_dict, ensure_ascii=False)
    return json_o

def _get_request_root_url(request):
    scheme = 'https' if request.is_secure() else 'http'
    site = get_current_site(request)
    return '%s://%s' % (scheme, site)
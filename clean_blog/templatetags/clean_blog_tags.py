from __future__ import absolute_import, division, unicode_literals

from mezzanine import template
from mezzanine.blog.models import BlogPost, BlogCategory
from django.conf import settings as django_settings
import json

register = template.Library()


@register.filter
def to_amp_url(url):
    if django_settings.USE_AMP:
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


@register.as_tag
def conv_blog_post_to_json_ld(blog=None):
    """
    Get blogpost JSON-LD
    """
    result_dict = {
        "@context": "http://schema.org",
        "@type": "BlogPosting",
        "headline": blog.title,
        "author": {"@type": "Person", "name": blog.user.first_name},
        "publisher": {"@type": "Organization",
                      "url": "https://www.monotalk.xyz",
                      "name": blog.user.first_name,
                      "logo": {"@type": "ImageObject",
                               "url": "https://drive.google.com/uc?export=view&id=0By5O5w7iwOMOVE5pTEcyeE40WlE"}
                      },
        "image": {"@type": "ImageObject",
                  "url": "https://drive.google.com/uc?export=view&id=0By5O5w7iwOMOMDdhaDhHdXBVTHc", "height": 450,
                  "width": 800},
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": blog.get_absolute_url_with_host(),
        },
        "genre": ' '.join(map(lambda n: n.title, blog.categories.all())),
        "wordcount": str(len(blog.content)),
        "datePublished": str(blog.publish_date),
        "dateCreated": str(blog.created),
        "dateModified": str(blog.updated),
        "description": blog.description
    }
    json_o = json.dumps(result_dict, ensure_ascii=False)
    return json_o

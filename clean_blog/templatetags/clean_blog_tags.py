
from __future__ import absolute_import, division, unicode_literals

from mezzanine import template

register = template.Library()


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

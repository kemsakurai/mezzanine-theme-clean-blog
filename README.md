# mezzanine-theme-clean-blog

[Start Bootstrap](http://startbootstrap.com/) - [Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/) based theme for [Mezzanine CMS](http://mezzanine.jupo.org/)

------------------------------------------------------------------------
## Getting started
To use this as a theme for your Mezzanine-based site:

### 1. Theme's dependencies      

* **required**     
Mezzanine                  4.3.0       
django-webpack-loader      0.5.0       

* **optional**   
When using the output function of critical css, install the following libraries.    
[kemsakurai/django-critical: Inlines critical path CSS and defers loading full CSS asynchronously.](https://github.com/kemsakurai/django-critical) 
```console
pip install git+https://github.com/kemsakurai/django-critical    
```

### 2. move work directory
```
cd <WORK_DIRECTORY>
```
### 3. git clone
```
git clone https://github.com/kemsakurai/mezzanine-theme-clean-blog.git
```

### 4. move clean_blog directory to your mezzaine project's directory
```
mv <WORK_DIRECTORY>/mezzanine-theme-clean-blog/clean_blog <INSTALLED_APPS>/clean_blog
```

### 5. Add "clean_blog", to the INSTALLED_APPS setting in settings.py
```python
################
# APPLICATIONS #
################
INSTALLED_APPS = (
    "clean_blog",
    "xxxxx"
```

### 6. Add "clean_blog/templates", to the TEMPLATE_DIRS setting in settings.py
```python
# Put strings here, like "/home/html/django_templates"
# or "C:/www/django/templates".
# Always use forward slashes, even on Windows.
# Don't forget to use absolute paths, not relative paths.
TEMPLATE_DIRS = (
	os.path.join(PROJECT_ROOT, "clean_blog/templates"),
    os.path.join(PROJECT_ROOT, "templates"),)
```

### 7. Add SRI Settings, in settings.py    
```python
#####################
# SRI SETTINGS #
#####################
try:                                                                                                                                                                                
    from clean_blog.sri import *
except ImportError:
    pass

```

------------------------------------------------------------------------------
## Config    
//TODO...   

------------------------------------------------------------------------------
## Another Project
[clean_blog_mezzanine](https://github.com/vskh/clean_blog_mezzanine#clean-blog-mezzanine)
Clean Blog based Mezzanine theme

# mezzanine-theme-clean-blog

# Getting started
To use this as a theme for your Mezzanine-based site:

1. move work directory
```
cd <WORK_DIRECTORY>
```
2. git clone
```
git clone https://github.com/kemsakurai/mezzanine-theme-clean-blog.git
```

3. move clean_blog directory to your mezzaine project's directory
```
mv <WORK_DIRECTORY>/mezzanine-theme-clean-blog/clean_blog <INSTALLED_APPS>/clean_blog
```

4. Add "clean_blog", to the INSTALLED_APPS setting in settings.py
```python
################
# APPLICATIONS #
################
INSTALLED_APPS = (
    "clean_blog",
    "xxxxx"
```

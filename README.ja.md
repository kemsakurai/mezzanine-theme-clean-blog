# mezzanine-theme-clean-blog

[Start Bootstrap](http://startbootstrap.com/) - [Clean Blog](http://startbootstrap.com/template-overviews/clean-blog/) をベースにした [Mezzanine CMS](http://mezzanine.jupo.org/) のテーマです。    

------------------------------------------------------------------------
## Getting started

サイトのテーマとして使用するには、次の手順を実行します。

### 1. テーマの依存モジュール      

* **必須**     
Mezzanine                  4.3.1      
Django                     1.11.20        
django-webpack-loader      0.5.0       

* **オプション**   
critical css の出力機能を使用する場合は、以下のライブラリをインストールしてください。     
[kemsakurai/django-critical: Inlines critical path CSS and defers loading full CSS asynchronously.](https://github.com/kemsakurai/django-critical) 
```console
pip install git+https://github.com/kemsakurai/django-critical    
```

### 2. 作業ディレクトリに移動    
```
cd <WORK_DIRECTORY>
```
### 3. git clone
```
git clone https://github.com/kemsakurai/mezzanine-theme-clean-blog.git
```

### 4. clean_blogディレクトリをmezzaineプロジェクトのディレクトリに移動する     

```
mv <WORK_DIRECTORY>/mezzanine-theme-clean-blog/clean_blog <INSTALLED_APPS>/clean_blog
```

### 5. settings.py の INSTALLED_APPS に "clean_blog" を追加する    
```python
################
# APPLICATIONS #
################
INSTALLED_APPS = (
    "clean_blog",
    "xxxxx"
```

### 6. settings.pyの TEMPLATE_DIRS に "clean_blog/templates" を追加する
```python
# Put strings here, like "/home/html/django_templates"
# or "C:/www/django/templates".
# Always use forward slashes, even on Windows.
# Don't forget to use absolute paths, not relative paths.
TEMPLATE_DIRS = (
	os.path.join(PROJECT_ROOT, "clean_blog/templates"),
    os.path.join(PROJECT_ROOT, "templates"),)
```

### 7. settings.py で clean_blog.sri.py を import する。   
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
## 設定          

### defaults.py    

以下の設定が `defaults.py`に定義されており、制御が可能です。[^1]   
[^1]：BUNDLE_JS_SRI、RESPOND_MIN_SRI、HTML5SHIV_SRI、PJAX_JS_SRIは `sri.py`で定義されています。       

|key|description|editable|default|
|:--|:--|:---|:----|
|TWITTER_ACCOUNT_NAME|フッターのTwitterアカウント名SNSリンク|True|""|
|FACEBOOK_USER_NAME|Facebookユーザー名フッターのSNSリンク|True|""|
|GITHUB_USER_NAME|フッターのGithubユーザー名SNSリンク|True|""|
|CLEAN_BLOG_GOOGLE_ADS_CLIENT_ID|Google Ads 広告を出力する際に設定する|True|""|
|CLEAN_BLOG_GOOGLE_ADS_SLOT_ID|Google Ads 広告を出力する際に設定する|True|""|
|CLEAN_BLOG_FACEBOOK_APP_ID|OGP に出力する FacebookのApp ID|True|""|
|CLEAN_BLOG_IS_VISIBLE_DESCRIPTION|ブログリストページ と 検索結果ページに Description タグを表示する否かを切り替えるフラグ|True|""|    
|BUNDLE_JS_SRI|bundle*.js の [Subresource Integrity MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) のハッシュ値|False|""|
|RESPOND_MIN_SRI|respond.js の [Subresource Integrity MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) のハッシュ値|False|""|
|BUNDLE_CSS_SRI|bundle*.css の [Subresource Integrity MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) のハッシュ値|False|""|
|HTML5SHIV_SRI|html5shiv.js の [Subresource Integrity MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) のハッシュ値|False|""|
|PJAX_JS_SRI|pjax*.js の [Subresource Integrity MDN](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) のハッシュ値|False|""|
|GOOGLE_TAG_MANAGER_ID|Google Tag Manager を使用する場合は、コンテナ ID を設定する|True|""|
|USE_GOOGLE_OPTIMIZE|Google Optimizeを使用する場合は Trueに設定すると、非表示スニペットを出力する|True|False|   
|DNS_PREFETCH_URLS|dns-prefetch のターゲットドメインを指定する|True|[]|   
|USE_AMP|[kemsakurai/mezzanine-theme-amp-start-blog-post: mezzanine theme based by amp start](https://github.com/kemsakurai/mezzanine-theme-amp-start-blog-post) を使用する場合は True に設定する|True|False|   
|SITE_LOGO_IMG_URL|サイトロゴの画像のURLを設定する。 これはJSON-LDで使用される|True|https://drive.google.com/uc?export=view&id=0By5O5w7iwOMOVE5pTEcyeE40WlE|    

------------------------------------------------------------------------------        
### Self Frontend Build         
clean_blog_frontend 配下には、テーマで使用する 静的コンテンツ類をまとめています。         
ビルド時に、[guess/packages/guess-webpack at master · guess-js/guess](https://github.com/guess-js/guess/tree/master/packages/guess-webpack) で Google Analytics の情報を取得しています。     
そのままでも動作はしますが、サイトの Google Analytics の設定に合わせて、ビルドし直すのをお勧めします。      
以下、ビルドの事前準備、設定、実行方法を記載します。                

* **git clone**      
```console
git clone https://github.com/kemsakurai/mezzanine-theme-clean-blog.git    
```

* **ディレクトリ移動**    
```console
cd mezzanine-theme-clean-blog/clean_blog_frontend     
```

* **pacakge インストール**    
```console
npm install
```

* **設定**      
`site-config.js` 内の `gaViewId` `pwaManifest` の 設定をインストールサイト向けに変更してください。       
```javascript
module.exports = {
    gaViewId: '<yourViewId>', // Google Analytics View Id
    pwaManifest: {
        name : 'www.monotalk.xyz',
        shortName : 'monotalk',
        description: '日々の書き込み',
        backgroundColor: '#ffffff',
        startUrl : './?utm_source=home_screen&utm_campaign=VisitFrom-home_screen&utm_medium=pwa',
        display : 'standalone',
        themeColor : '#808080',
        relatedApplications : [],
        preferRelatedApplications : false
    }
}
```

* **ビルド**      
以下のコマンドで、Frontend の ビルドと、ビルド後のリソースを元に`sri.py` の再生成を行います。      
```console
npm run build:gen      
```

ビルド後は、clean_blog ディレクトリ配下に静的コンテンツが配置されます。       
再度サーバーに配布してください。     

------------------------------------------------------------------------------
## Another Project
* [clean_blog_mezzanine](https://github.com/vskh/clean_blog_mezzanine#clean-blog-mezzanine)      
Clean Blog を元にした Mezzanine のテーマです。 このテーマ作成時に参考にしました。       

------------------------------------------------------------------------------
## AMP Theme     
* [kemsakurai/mezzanine-theme-amp-start-blog-post: mezzanine theme based by amp start](https://github.com/kemsakurai/mezzanine-theme-amp-start-blog-post)    
[Blog | Monotalk](https://www.monotalk.xyz/) で使用している AMP のテーマです。    

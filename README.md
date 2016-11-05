#公文通
基于校公文通获取校团委发布公文通信息并管理是否发布公文通的系统
---
获取源码
```
git clone https://github.com/a972667237/Board.git
```
安装依赖
```
pip install -r requirements.txt -i http://pypi.douban.com/simple/ --trusted-host pypi.douban.com
```

创建数据表
```
python manage.py makemigrations
python manage.py migrate
```

运行爬虫
```
python spider/method.py
```

运行代码
```
python manage.py runserver
```

访问页面
```
localhost:8000            (主页)
localhost:8000/manage     (管理后台)
```

* 暂时没有对权限管理
* 暂时没有开启自动更新爬虫
* 模板基于学子模板
* bug偏多，别介意

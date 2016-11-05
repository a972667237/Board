from django.shortcuts import render
from .models import Item
from django.http import HttpResponseRedirect, HttpResponse
from django.core.paginator import Paginator, EmptyPage, InvalidPage
from .method import update_info
import json

# Create your views here.
def index(requests):
    article_list = Item.objects.filter(isShow=True).order_by('-isTop', '-date')
    paginator = Paginator(article_list,30)
    try:
        page = int(requests.GET.get('page',1))
        article_list = paginator.page(page)
    except(EmptyPage, InvalidPage):
        article_list = paginator.page(1)
    return render(requests, 'index.html', locals())

def update(requests):
    update_info()
    return HttpResponseRedirect('/')


def manage(requests):
    article_list = Item.objects.all().order_by('-isTop', '-date')
    paginator = Paginator(article_list, 100)
    try:
        page = int(requests.GET.get('page', 1))
        article_list = paginator.page(page)
    except(EmptyPage, InvalidPage):
        article_list = paginator.page(1)
    return render(requests, 'manage.html', locals())

def top(requests):
    uid = requests.POST.get('uid')
    item = Item.objects.get(UID=uid)
    if item.isTop:
        item.isTop = False
        item.save()
    else:
        item.isTop = True
        item.save()
    return HttpResponse("")

def show(requests):
    uid = requests.POST.get('uid')
    item = Item.objects.get(UID=uid)
    if item.isShow:
        item.isShow = False
        item.save()
    else:
        item.isShow = True
        item.save()
    return HttpResponse("")

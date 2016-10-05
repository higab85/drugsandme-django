from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^alcohol/$', views.alcohol, name='alcohol'),
    url(r'^mdma/$', views.mdma, name='mdma'),
    url(r'^lsd/$', views.lsd, name='lsd'),
    url(r'^ketamine/$', views.ketamine, name='ketamine'),
    url(r'^cocaine/$', views.cocaine, name='cocaine'),
    url(r'^cannabis/$', views.cannabis, name='cannabis'),
    url(r'^me/$', views.me, name='me'),
    url(r'^about/$', views.about, name='about'),
    url(r'^donate/$', views.donate, name='donate'),
    url(r'^disclaimer/$', views.disclaimer, name='disclaimer'),
]

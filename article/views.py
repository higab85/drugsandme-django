
from django.shortcuts import render

def index(request):
    # context = {}
    return render(request, 'article/index.html')

def alcohol(request):
    # context = {}
    return render(request, 'article/alcohol.html')

def mdma(request):
    # context = {}
    return render(request, 'article/mdma.html')

def me(request):
    # context = {}
    return render(request, 'article/me.html')

def lsd(request):
    # context = {}
    return render(request, 'article/lsd.html')

def about(request):
    # context = {}
    return render(request, 'article/about.html')

def ketamine(request):
    # context = {}
    return render(request, 'article/ketamine.html')

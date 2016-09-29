
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

def cocaine(request):
    # context = {}
    return render(request, 'article/cocaine.html')

def cannabis(request):
    # context = {}
    return render(request, 'article/cannabis.html')

def donate(request):
    # context = {}
    return render(request, 'article/donate.html')

def disclaimer(request):
    # context = {}
    return render(request, 'article/disclaimer.html')

def custom_404(request):
    return render(request, 'article/404.html')

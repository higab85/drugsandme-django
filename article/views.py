
from django.shortcuts import render

def index(request):
    # context = {}
    return render(request, 'article/index.html')

def alcohol(request):
    # context = {}
    return render(request, 'article/alcohol.html')

from django.urls import path
from .views import PlaceListView, PlaceDetailView, CommentListView, CommentDetailView

urlpatterns = [
  path('', PlaceListView.as_view()),
  path('<int:pk>/', PlaceDetailView.as_view()),
  path('<int:pk>/comments/', CommentListView.as_view()),
  path('<int:pk>/comments/<int:comment_pk>/', CommentDetailView.as_view())
]
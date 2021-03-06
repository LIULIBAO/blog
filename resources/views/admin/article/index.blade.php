@extends('admin.layouts.app')

@section('contents')
    <div class="row">
        <div class="col-xs-12">
            <div class="box col-xs-11">
                <div class="box-header" style="padding-left: 0;">
                    <h3 class="box-title">{{isset($page_title) ? $page_title : ''}}</h3>

                    <form action="{{url('article')}}" id="searchForm" method="get" class="search-form">
                        <div class="col-sm-3 search-box">
                            <label for="input_category">文章分类</label>
                            <select  class="form-control" style="width: 60%" name="category_id" title="请选择分类">
                                <option value="0">请选择文章分类</option>
                                @foreach($category as $key => $item)
                                    <option value="{{$key}}"
                                        @if(null !== request('category_id') && request('category_id') == $key ) {{"selected='selected'"}}  @endif>
                                        {{$item}}
                                    </option>
                                @endforeach
                            </select>
                        </div>

                        <div class="col-sm-3 search-box">
                            <label for="input_name" >文章标题</label>
                            <input type="text"  style="width: 60%" class="form-control" name="title"
                                   value="{{(null !== request('title')) ? request('title') : ''}}"  title="请填写标题">
                        </div>

                        <div class="search-btu-box" >
                            <a href="javascript:void (0);" class="btn btn-info searchBtn"><i class="fa fa-search"></i> 搜 索 </a>
                            <a href="{{url('article/edit')}}" class="btn btn-info"><i class="fa fa-plus"></i> 添加文章</a>
                        </div>
                    </form>
                </div>

                <div class="box-body table-responsive no-padding">
                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th >ID</th>
                                <th >文章标题</th>
                                <th >阅读数</th>
                                <th >点赞数</th>
                                <th >评论数</th>
                                <th >文章归属</th>
                                <th >文章分类</th>
                                <th >是否评论</th>
                                <th >是否推荐</th>
                                <th >状态</th>
                                <th >创建时间</th>
                                <th style="width: 12%;">操作</th>
                            </tr>
                        </thead>
                        <tbody>
                           @if(isset($lists))
                               @foreach($lists as $item)
                                   <tr role="row" class="odd">
                                       <td class="sorting_1">{{$item->id}}</td>
                                       <td>{{$item->title}}</td>
                                       <td>{{$item->read_num}}</td>
                                       <td>{{$item->like_num}}</td>
                                       <td>{{$item->comment_num}}</td>
                                       <td>{{$types[$item->type_id]}}</td>
                                       <td>{{$category[$item->category_id]}}</td>
                                       <td>{{$item->is_comment ? '是' : '否'}}</td>
                                       <td>{{$item->is_recommend ? '是' : '否'}}</td>
                                       <td>
                                           @if($item->deleted_at > 0)
                                               <span class="label label-danger">已删除</span>
                                           @else
                                               <span class="label label-success">正常</span>
                                           @endif
                                       </td>
                                       <td>{{$item->created_at}}</td>
                                       <td>
                                           <a href="{{url('article/edit?id='.$item->id)}}"  class="btn btn-default btn-sm">
                                               <i class="fa fa-edit"></i> 编辑
                                           </a>

                                           <a href="javascript:void (0);"  class="btn btn-danger btn-sm submitDelete"
                                              data-url="{{url('article/delete')}}" data-id="{{$item->id}}">
                                               <i class="fa  fa-trash"></i> 删除
                                           </a>
                                       </td>
                                   </tr>
                               @endforeach
                           @endif
                        </tbody>
                    </table>
                </div>
                <div class="box-footer clearfix">
                    {{ isset($lists) ? $lists->links() : ''}}
                </div>
            </div>
        </div>
    </div>
@stop

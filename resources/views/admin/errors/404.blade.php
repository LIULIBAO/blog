@extends('admin.layouts.app')

@section('contents')
    <div class="row">
        <div class="col-xs-12" style="text-align: center">
         <pre class="page-404">
                      .----.
                   _.'__    `.
               .--($)($$)---/#\
             .' @          /###\
             :         ,   #####
              `-..__.-' _.-\###/
                    `;_:    `"'
                  .'"""""`.
                 /,  ya ,\\
                //  404!  \\
                `-._______.-'
                ___`. | .'___
               (______|______)

                    @if(isset($message)) {{$message}} @endif
          </pre>

        </div>
    </div>
@stop
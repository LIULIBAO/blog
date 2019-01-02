<?php
/**
 * Created by PhpStorm.
 * User: Raytine
 * Date: 2018/12/27
 * Time: 11:11
 */

namespace App\Repositories\Advert;


use App\Models\Advert;
use App\Repositories\BaseRepository;
use Illuminate\Http\Request;

class AdvertRepository extends BaseRepository
{

    /**
     * 定义model 类名
     * @return mixed
     */
    public function model()
    {
        return Advert::class;
    }

    /**
     * 获取广告分类
     * @return mixed
     */
    public function getTypes()
    {
        return $this->model->types();
    }

    /**
     * 获取列表
     * @param Request $request
     * @return mixed
     */
    public function getLists(Request $request)
    {
        $result = $this->model;

        if(!empty($request->title)){
            $result = $result->where('title', 'like', '%'.$request->title.'%');
        }

        if(!empty($request->type_id)){
            $result = $result->where('type_id', $request->type_id );
        }

        return $result = $result->where('deleted_at', '0')
            ->with('attachment')
            ->orderBy('id', 'desc')
            ->paginate();
    }


}
<template>
  <section class="view-container clearfix">

    <el-col :span="24" class="toolbar clearfix">
      <!--步骤条-->
      <crm-steps :steps="settingSteps" :active="settingStepsActive" ></crm-steps>
      <!--步骤1-->
      <div id="step1" class="clearfix" v-if="step1Show">
        <el-form :model="steps1" :size="'small'" label-width="100px">
          <el-form-item label="落地页名称">
            <el-input v-model="steps1.pageName" placeholder="输入落地页名称" maxlength="32"></el-input>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="所属机构">
            <el-select v-model="steps1.orgName" placeholder="请选择">
              <el-option
                v-for="item in orgNameList"
                :key="item"
                :value="item">
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="所属项目">
            <el-select v-model="steps1.projectName" placeholder="请选择">
              <el-option
                v-for="(item,index) in projectList"
                :key="index"
                :value="item.projectName"
                :label="item.projectName"
              >
              </el-option>
            </el-select>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="400电话">
            <span style="margin: 0 10px;">400 -</span>
            <el-input v-model="callTel1" class="callTel1" placeholder="数字" maxlength="32"></el-input>
            <span style="margin: 0 5.5px;">转</span>
            <el-input v-model="callTel2" class="callTel2" placeholder="数字" maxlength="32"></el-input>
            <span class="important">*</span>
          </el-form-item>
          <el-form-item label="网页标签名">
            <el-input v-model="steps1.label"></el-input>
          </el-form-item>
          <span class="tips">指落地页在网页名称或分享后显示的链接标题</span>
        </el-form>
        <div class="warning-zone" v-if="step1Warining">
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="steps1.pageName =='' ">
              <div class="warning-icon">!</div>
              <span>请输入落地页名称</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="steps1.orgName =='' ">
              <div class="warning-icon">!</div>
              <span>请选择所属机构</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="steps1.projectName =='' ">
              <div class="warning-icon">!</div>
              <span>请选择投放项目</span>
            </div>
          </div>
          <div class="warning-item clearfix">
            <div class="warning-wrap" v-if="callTel1 == '' || callTel2 == '' ">
              <div class="warning-icon">!</div>
              <span>无法获取项目电话，请手动输入</span>
            </div>
          </div>
        </div>
      </div>
      <!--步骤2-->
      <div id="step2" v-if="step2Show">
        <div class="left">
          <!--头图设置-->
          <div class="top-setting">
            <div class="banner item" :class="{active:item.name == step2Active}" v-for="item in step2.basic" @click="editItem(item)">
              <img class="icon" :src="item.url" width="40" alt="">
              <p>{{ item.name }}</p>
              <div class="edit"></div>
            </div>
          </div>
          <!--功能设置-->
          <div class="func-setting">
            <div class="title">
              <span>导航栏与模块</span>
              <el-button class="important" size="small fr" @click="editNav('导航栏')">编辑导航栏</el-button>
            </div>
            <div class="body">
              <draggable class="item-list" v-model="step2.label" element="div" :options="dragOptions"  @update="datadragEnd">
                <transition-group type="transition" :name="'flip-list'" tag="div" style="width: 928px;display: flex;flex-wrap: wrap;">
                  <div class="item" :class="{active:item.name == step2Active}"  v-for="(item,index) in step2.label" :key="index" @click="editItem(item,index)">
                    <img class="icon" :src="`${URL_ROOT}${item.url}`" width="40" alt="">
                    <p>{{ item.name }}</p>
                    <div class="edit"></div>
                    <div class="dl" @click.stop="deleteItem(item,index)"></div>
                  </div>
                </transition-group>
              </draggable>
            </div>
            <div class="body">
              <div class="item add" @click="addLabel()">
                <img class="icon" src="../../assets/landingpage/settings/setting_add_icon@3x.png" style="margin-bottom: 9px" width="31" alt="">
                <p>添加导航模块</p>
              </div>
            </div>
          </div>

          <!--选择添加的标签模块弹窗-->
          <el-dialog title="选择添加的标签模块" :visible.sync="dialogTableVisible" width="400px">
            <el-checkbox-group v-model="step2.label" @change="handleCheckedCitiesChange">
              <div v-for="item in step2DialogLabel">
                <el-checkbox  :label="item" :key="item.order">{{item.name}}</el-checkbox>
              </div>
            </el-checkbox-group>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="dialogTableVisible = false" size="small">确 定</el-button>
            </div>
          </el-dialog>



          <!--插件设置-->
          <div class="plugin-setting" style="margin-bottom: 0px;border: none">
            <div class="title">
              <span>插件</span>
              <el-button class="important" size="small fr">编辑插件</el-button>
            </div>
            <div class="body">
              <div class="item" :class="{active:item.name == step2Active}" v-for="(item,index) in step2.plugins" @click="editItem(item,index)">
                <img class="icon" :src="`${URL_ROOT}${item.url}`" width="40" alt="">
                <p>{{ item.name }}</p>
                <div class="edit"></div>
                <div class="dl"></div>
              </div>
            </div>
          </div>
        </div>
        <!--功能-->
        <div class="right" v-if="step2Active">
          <div class="wrap" >
            <div class="title clearfix">
              <img class="title-icon" v-if="step2Right.type!=0" :src="`${URL_ROOT}${step2Right.url}`" width="40">
              <img class="title-icon" v-else="step2Right.type==0" :src="`${step2Right.url}`" width="40">
              <div class="title-name">{{step2Right.name}}设置</div>
            </div>
            <div class="form clearfix" v-if="step2Right.type == 1">
              <div class="form-item">
                <div class="form-item-name">在导航栏中的名称</div>
                <el-input
                  class="form-item-input"
                  :placeholder="step2Right.name"
                  maxlength="4"
                  :size="'small'"
                  v-model="step2Right.rename"
                  @change="step2.label[step2Right.idx].rename = step2Right.rename"
                >
                </el-input>
              </div>
            </div>
            <el-button
              v-if="step2Right.type == 0"
              class="important form-item-btn"
              :size="'small'"
              @click="editBanner()"
            >编辑模块内容</el-button>
            <el-button
              v-if="step2Right.type == 1"
              class="important form-item-btn"
              :size="'small'"
              @click="editStyle()"
            >编辑模块内容</el-button>
            <el-button
              v-if="step2Right.type == 2"
              class="important form-item-btn"
              :size="'small'"
              @click="editPlugin()"
            >编辑模块内容</el-button>
          </div>
        </div>
        <!--按钮-->
        <div class="right" v-if="step2BtnActive">
          <div class="wrap" >
            <div class="title clearfix">
              <div class="title-name">{{step2BtnActive}}设置</div>
            </div>
            <div class="form clearfix" >
              <div class="form-item">
                <div class="form-item-name">在界面状态</div>
                <el-radio-group class="radio" v-model="navVisibility">
                  <el-radio :label="1">显示</el-radio>
                  <el-radio :label="0">隐藏</el-radio>
                </el-radio-group>
              </div>
            </div>
            <el-button
              class="important form-item-btn"
              :size="'small'"
              @click="b"
            >编辑模块内容</el-button>
          </div>
        </div>
      </div>
      <!--步骤3-->
      <div id="step3" v-if="step3Show">
        <!--头图设置-->
        <div id="banner-setting" v-if="step2ActiveTpye == 'banner'">
          <div class="title">编辑内容</div>
          <div class="content clearfix">
            <div class="label left" >上传图片</div>
            <div class="img-upload right">
              <el-upload
                :action="IMG_UPLOAD"
                list-type="picture-card"
                drag
                :on-success="uploadSuccess"
                :limit="3"
                :file-list="bannerFileList"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :before-upload="beforeUploadBanner"
                :disabled="uploadDisabled"
              >
                <i class="el-icon-plus"></i>
                <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片
                  </div>
                <div
                  class="el-upload__tip"
                  slot="tip"
                  style="width: 360px;color: #9FA9BA;margin-top: 20px"
                >最多三张；支持jpg,png,jpeg,gif；大小不超过600k；建议上传1920px*500px分辨率图片；</div>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
            </div>
          </div>
        </div>
        <!--标签模块设置-->
        <div id="label-setting" v-if="step2ActiveTpye == 'label'">
          <div class="clearfix" style="padding-top: 30px">
            <el-col :span="24" class="toolbar">
              <el-radio-group v-model="step3.status" :size="'small'" @change="step3GetStatus">
                <el-radio-button label="0" >样式库模式</el-radio-button>
                <el-radio-button label="1" >编辑器模式</el-radio-button>
              </el-radio-group>
            </el-col>
          </div>
          <!--样式库模式-->
          <div class="content" v-if="step3.status == 0">
            <!--样式库列表-->
            <div class="styel-list left">
              <div class="style-list-ltem">
                <div class="title">图文样式</div>
                <div class="list">
                  <div
                    class="list-item"
                    :class="{active:item.id == step3ActiveStyleId}"
                    v-for="(item,index) in styleList"
                    v-if="item.type === 1"
                    @click="selectStyle(item,index)"
                  ></div>
                  <!--:style="{backgroundImage:`url(${URL_ROOT}${item.url})`}"-->
                </div>
              </div>
              <div class="style-list-ltem">
                <div class="title">图片样式</div>
                <div class="list">
                  <div
                    class="list-item"
                    :class="{active:item.id == step3ActiveStyleId}"
                    v-for="(item,index) in styleList"
                    v-if="item.type === 2"
                    @click="selectStyle(item,index)"
                  ></div>
                </div>
              </div>
              <div class="style-list-ltem">
                <div class="title">文字样式</div>
                <div class="list">
                  <div
                    class="list-item"
                    :class="{active:item.id == step3ActiveStyleId}"
                    v-for="(item,index) in styleList"
                    v-if="item.type === 3"
                    @click="selectStyle(item,index)"
                  ></div>
                </div>
              </div>
            </div>
            <!--表单-->
            <div class="from-list middle">


              <div class="title">编辑内容</div>
              <div>
                <el-form :model="step3" :size="'small'" label-width="80px">
                  <template v-for="(item,index) in activeFormList">
                    <!--图片1-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===0">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading0"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess0"
                        :before-upload="beforeAvatarUpload0"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl0" :src="imageUrl0" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片2-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===1">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading1"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess1"
                        :before-upload="beforeAvatarUpload1"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl1" :src="imageUrl1" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片3-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===2">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading2"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess2"
                        :before-upload="beforeAvatarUpload2"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl2" :src="imageUrl2" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片4-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===3">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading3"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess3"
                        :before-upload="beforeAvatarUpload3"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl3" :src="imageUrl3" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片5-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===4">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading4"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess4"
                        :before-upload="beforeAvatarUpload4"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl4" :src="imageUrl4" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片6-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===5">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading5"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess5"
                        :before-upload="beforeAvatarUpload5"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl5" :src="imageUrl5" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片7-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===6">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading6"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess6"
                        :before-upload="beforeAvatarUpload6"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl6" :src="imageUrl6" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片10-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===9">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading9"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess9"
                        :before-upload="beforeAvatarUpload9"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl9" :src="imageUrl9" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片13-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===12">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading12"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess12"
                        :before-upload="beforeAvatarUpload12"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl12" :src="imageUrl12" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>
                    <!--图片16-->
                    <el-form-item :label="item.name" v-if="item.type === 1&&index ===15">
                      <el-upload
                        class="avatar-uploader"
                        :action="IMG_UPLOAD"
                        v-loading="imgLoading15"
                        drag
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess15"
                        :before-upload="beforeAvatarUpload15"
                        :on-remove="handleRemove"
                      >
                        <img v-if="imageUrl15" :src="imageUrl15" class="avatar">
                        <div v-else>
                          <i class="el-icon-plus avatar-uploader-icon"></i>
                          <div class="el-upload__text"><em>上传</em> 或 <em>拖动</em> 添加图片</div>
                        </div>
                      </el-upload>
                    </el-form-item>


                    <el-form-item :label="item.name" v-if="item.type === 2">
                      <el-input v-model="item.value" :placeholder="item.tips" maxlength="32"></el-input>
                    </el-form-item>
                    <el-form-item :label="item.name" v-if="item.type === 3">
                      <el-input type="textarea"  v-model="item.value" resize="none"></el-input>
                    </el-form-item>
                  </template>
                </el-form>
              </div>



            </div>
            <!--展示图片-->
            <div class="pic-list right" >
              <div class="title">当前样式</div>
              <div class="style-img">
                <img src="../../assets/example.png" width="388" alt="">
              </div>
            </div>
          </div>
          <!--编辑器模式-->
          <template v-if="step3.status == 1">
            <crm-editor :detailContent="editorContent" @on-change="changeContent"></crm-editor>
          </template>
        </div>


        <!--插件设置-->
        <div id="plugin-setting" v-if="step2ActiveTpye == 'plugin'">
          <div class="plugin-form-top clearfix">
            <img :src="`${URL_ROOT}${step2Right.url}`" width="40" alt="">
            <div class="name">{{ step2Right.name }}设置</div>
          </div>
          <div class="plugin-form-wrap">
            <el-form  :size="'small'" label-width="100px">
              <el-form-item label="模式选择">
                <el-radio v-model="pluginForm[0].value" label="0">400电话+留电+姓名</el-radio>
                <el-radio v-model="pluginForm[0].value" label="1">400电话+留电</el-radio>
                <el-radio v-model="pluginForm[0].value" label="2">留电+姓名</el-radio>
                <el-radio v-model="pluginForm[0].value" label="3">留电</el-radio>
                <el-radio v-model="pluginForm[0].value" label="4">400电话<span class="important">*</span></el-radio>

              </el-form-item>
              <el-form-item label="设置400电话">
                <el-radio v-model="pluginForm[1].value" label="0" @change="telTypeChange">400电话样式</el-radio>
                <el-radio v-model="pluginForm[1].value" label="1" @change="telTypeChange">普通电话样式<span class="important">*</span></el-radio>
              </el-form-item>
              <el-form-item label="" style="margin-bottom: 28px">
                <template v-if="pluginForm[1].value == 0">
                  <span>400 -</span>
                  <el-input v-model="pluginForm[2].value1" class="callTel1" placeholder="请输入">400电话样式</el-input>
                  <span>转</span>
                  <el-input v-model="pluginForm[2].value2" class="callTel2" placeholder="请输入">普通电话样式</el-input>
                </template>
                <template v-if="pluginForm[1].value == 1">
                  <el-input v-model="pluginForm[2].value" class="callTel" placeholder="请输入客户拨打的电话号码">400电话样式</el-input>
                </template>
              </el-form-item>
              <el-form-item label="设置提交按钮" style="margin-bottom: 24px">
                <el-input v-model="pluginForm[3].value" label="0" class="callTel" maxlength="4"></el-input>
                <span style="margin-left: 25px">按钮颜色</span>
                <el-color-picker v-model="pluginForm[4].value" class="color-picker"></el-color-picker>
              </el-form-item>
              <el-form-item label="预约时间" style="margin-bottom: 12px">
                <el-radio v-model="pluginForm[5].value" label="0">显示</el-radio>
                <el-radio v-model="pluginForm[5].value" label="1">隐藏<span class="important">*</span></el-radio>
              </el-form-item>
              <el-form-item label="" style="margin-bottom: 12px">
                <el-radio v-model="pluginForm[6].value" label="0">选填</el-radio>
                <el-radio v-model="pluginForm[6].value" label="1">必填</el-radio>
              </el-form-item>
              <el-form-item label="" style="margin-bottom: 20px">
                <el-checkbox-group v-model="pluginForm[7].value">
                  <el-checkbox label="周一">周一</el-checkbox>
                  <el-checkbox label="周二">周二</el-checkbox>
                  <el-checkbox label="周三">周三</el-checkbox>
                  <el-checkbox label="周四">周四</el-checkbox>
                  <el-checkbox label="周五">周五</el-checkbox>
                  <el-checkbox label="周六">周六</el-checkbox>
                  <el-checkbox label="周日">周日</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="户型" style="margin-bottom: 12px">
                <el-radio v-model="pluginForm[8].value" label="0">显示</el-radio>
                <el-radio v-model="pluginForm[8].value" label="1">隐藏<span class="important">*</span></el-radio>
              </el-form-item>
              <el-form-item label="" style="margin-bottom: 12px">
                <el-radio v-model="pluginForm[9].value" label="0">选填</el-radio>
                <el-radio v-model="pluginForm[9].value" label="1">必填</el-radio>
              </el-form-item>
              <el-form-item label="" v-for="(item,index) in pluginForm[10]" :key="index" style="margin-bottom: 12px">
                  <el-input v-model="item.value" class="callTel3" placeholder="请输入户型"></el-input>
                  <el-button  icon="el-icon-delete" size="small" style="width: 32px;padding: 9px 0px" @click="removeRoom(item,index)"></el-button>
                  <el-button  icon="el-icon-plus" size="small" style="width: 32px;padding: 9px 0px" v-if="index == pluginForm[10].length-1" @click="addRoomType()"></el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="24">
      <el-button type="primary" size="small fr" v-if="settingStepsActive===0" @click="nextStep()">下一步</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===0" @click="saveStep1('确定保存当前编辑内容？',true)">保存</el-button>
      <el-button size="small fr" v-if="settingStepsActive===0">预览</el-button>
      <el-button size="small fr" v-if="settingStepsActive===0">取消</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===0">更换模板</el-button>


      <el-button type="primary" size="small fr" v-if="settingStepsActive===1" @click="lastStep()">上一步</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===1" @click="saveStep2()">保存</el-button>
      <el-button size="small fr" v-if="settingStepsActive===1" >发布</el-button>
      <el-button size="small fr" v-if="settingStepsActive===1">预览</el-button>
      <el-button size="small fr" v-if="settingStepsActive===1">取消</el-button>

      <!--banner图按钮-->
      <el-button type="primary" size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='banner'" @click="saveStep3Banner()">保存111</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===2&&step2ActiveTpye==='banner'" @click="bbb()">重置</el-button>
      <el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='banner'" @click="step3Cancel()">取消</el-button>

      <!--样式库按钮-->
      <el-button type="primary" size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0" @click="saveStep3Label()">保存</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0" @click="resetStyle()">重置</el-button>
      <el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 0" @click="step3Cancel()">取消</el-button>

      <!--编辑器按钮-->
      <el-button type="primary" size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1" @click="saveStep3Editor()">保存</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1" @click="resetEditor()">重置</el-button>
      <el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='label'&&step3.status == 1" @click="step3Cancel()">取消</el-button>

      <!--插件按钮-->
      <el-button type="primary" size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'" @click="saveStep3Plugin()">保存</el-button>
      <el-button size="small fr" class="important" v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'" @click="ccc()">重置</el-button>
      <el-button size="small fr" v-if="settingStepsActive===2&&step2ActiveTpye==='plugin'" @click="step3Cancel()">取消</el-button>



    </el-col>
  </section>
</template>

<script>
    import { URL_ROOT,IMG_UPLOAD} from '../../common/js/types'
    import _ from 'lodash'
    import draggable from 'vuedraggable'
    import crmSteps from '../../components/base/crmSteps.vue'
    import crmEditor from '../../components/base/crmEditor.vue'
    export default {
      components:{
        crmSteps,
        crmEditor,
        draggable,
      },
      created(){
        //store获取模板id
        let templateId ={"templateId":this.$store.getters.getLandingPageType == '' ? 'a7d22e47-4aad-11e8-a730-00163e04791f': this.$store.getters.getLandingPageType}
        this.steps1.uuid = this.$store.getters.getLandingPageId
        this.steps1.template = templateId["templateId"]
        //获取落地页模板标签/插件列表
        this.getLabel(templateId)
        //请求落地页机构下拉菜单
        this.getOrgList()
        //请求落地页项目下拉菜单
        this.getProjectList()
        //请求落地页样式库列表
        this.getStyleList()

        console.log('刚进来时：',this.steps1)
      },
      computed:{
        dragOptions() {
          return  {
            animation: 300,
            group: 'description',
            disabled: !this.editable,
            ghostClass: 'ghost'
          };
        },
      },
      data() {
        return {
          //全局状态控制
          URL_ROOT,
          IMG_UPLOAD,
          editable:true,
          //步骤条传参
          settingSteps:["基本信息","编辑模块","编辑内容"],
          settingStepsActive:0,
          //样式库列表
          styleList:[],
          //步骤先是标识
          step1Show:true,
          step2Show:false,
          step3Show:false,


          //步骤1
          steps1:{
            pageName:"",
            orgName:"",
            projectName:"",
            projectCode:"",
            callTel:"",
            label:"",
            uuid:"",
            template:"",
          },
          //400电话
          callTel1:"",
          callTel2:"",
          //多选数组
          orgNameList:[],
          projectList:[],
          //step1保存标识
          step1Save:false,
          step1Warining:false,
          step1SaveObject:{},


          //步骤二
          step2:{
            basic:[
              {
                name:"头图",
                url:require('../../assets/landingpage/settings/setting_banner_icon@3x.png'),
                type: 0,
                order:0
              }
            ],
            label:[],
            plugins:[]
          },

          //功能
          //添加label弹窗
          step2DialogLabel:[],
          checkedLabels:[],
          dialogTableVisible:false,
          //当前选中标签名称
          step2Active:"",
          //当前选中标签ID
          step2ActiveId:"",
          step2Right:{},
//          step2params:[],
          //按钮
          step2BtnActive:"",
          navVisibility:1,
          step2SaveObject:{},
          //当前编辑功能
          step2ActiveTpye:"",


          //步骤3
          step3:{
            labelId:"",
            status:0,
            //html块id,新增后返回
            htmlId:"",
            pageName:"",
            label:"",
            desc:""

          },
          //弹窗图片
          dialogImageUrl: '',
          dialogVisible: false,
          //头图img列表
          uploadDisabled:false,
          bannerFileList:[],
          //上传结果ID
          uploadresultList:[],
          //样式库上传图片
          imgLoading0:false,
          imageUrl0:"",
          imgLoading1:false,
          imageUrl1:"",
          imgLoading2:false,
          imageUrl2:"",
          imgLoading3:false,
          imageUrl3:"",
          imgLoading4:false,
          imageUrl4:"",
          imgLoading5:false,
          imageUrl5:"",
          imgLoading6:false,
          imageUrl6:"",
          imgLoading9:false,
          imageUrl9:"",
          imgLoading12:false,
          imageUrl12:"",
          imgLoading15:false,
          imageUrl15:"",


          //当前选中样式库
          step3ActiveStyleId:"",
          activeFormList:[],

          //编辑器内容
          editorContent:"",
          //插件表单
          pluginForm:[
            {"value":"0"},
            {"value":"0"},
            {"value":"","value1":"","value2":""},
            {"value":"立即提交"},
            {"value":"#0077FF"},
            {"value":"0"},
            {"value":"0"},
            {"value":[]},
            {"value":"0"},
            {"value":"0"},
            [{"value":"两房一厅一卫"},{"value":"两房一厅一卫"}],
          ],

        }
      },
      watch:{

      },
      methods:{
        bbb(){},
        ccc(){},
        b(){
          console.log(this.navVisibility)
        },

        //获取模板标签/插件
        getLabel(templateId){
          if(this.steps1.uuid){
            this.$api.requstEditorMessage(this.$store.getters.getLandingPageId).then(res=>{
              console.log(res)
              if(res.code == 1){
                //step1
                this.steps1.pageName = res.data.pageName
                this.steps1.orgName = res.data.orgName
                this.steps1.projectName = res.data.projectName
                this.steps1.projectCode = res.data.projectCode
                this.steps1.template = res.data.template
                this.callTel1 = res.data.callTel.split(",")[0]
                this.callTel2 = res.data.callTel.split(",")[1]
                //step2banner
                this.step2.basic[0].resultList = res.data.pics
                console.log(this.step2.basic[0].resultList)
                let arr = _.map(this.step2.basic[0].resultList,obj=>{
                  if(obj.value){
                    return {
                      "url":obj.value
                    }
                  }else{
                    return {
                      "url":""
                    }
                  }
                })
                this.bannerFileList = arr.filter((obj,idx)=>{
                  return obj.url!==""
                })
                console.log(this.bannerFileList)
                //step2label
                this.step2.label = _.map(res.data.labels,(obj,index)=>{
                  if(obj.fields){
                    delete  obj.html
                    obj.resultList = obj.fields
                    obj.saveId = obj.id
                    obj.id = obj.labelId
                  }
                  return obj
                })
                let plugin = res.data.plugins[0]

                this.$api.requestLabelList(templateId).then(res =>{
                  if(res.code === 1){
                    console.log(res.data);

                    this.step2DialogLabel = Object.assign({},res.data.label)
                    console.log('zzz',this.step2DialogLabel)
                    for (let [key,value] of Object.entries(this.step2DialogLabel)) {
                      console.log(key,value)
                      for(let i = 0;i<this.step2.label.length;i++){
                        if(value.url == this.step2.label[i].url){
                          this.step2DialogLabel[key] = this.step2.label[i]
                        }
                      }
                    }
                    
                    this.step2.plugins = res.data.plugins
                    this.step2.plugins[0].resultList = plugin.fields
                    this.step2.plugins[0].id = plugin.labelId
                    this.step2.plugins[0].saveId = plugin.id
                    this.step2.plugins[0].htmlId = plugin.htmlId

                    console.log(this.pluginForm[0].value)


                  }
                }).catch(err=>{

                }).then(()=>{
                  let list = _.map(this.step2.plugins[0].resultList[10].value.split(","),item=>{
                    return {"value":item}
                  })
                    let str = this.step2.plugins[0].resultList[2].value
                  let value = str.includes("转")?"":str
                  let value1 = str.includes("转")?str.split("转")[0]:""
                  let value2 = str.includes("转")?str.split("转")[1]:""
                  console.log(str,value,value1,value2)

                  this.pluginForm[0].value = this.step2.plugins[0].resultList[0].value
                  this.pluginForm[1].value = this.step2.plugins[0].resultList[1].value
                  this.pluginForm[2].value = value
                  this.pluginForm[2].value1 = value1
                  this.pluginForm[2].value2 = value2
                  this.pluginForm[3].value = this.step2.plugins[0].resultList[3].value
                  this.pluginForm[4].value = this.step2.plugins[0].resultList[4].value
                  this.pluginForm[5].value = this.step2.plugins[0].resultList[5].value
                  this.pluginForm[6].value = this.step2.plugins[0].resultList[6].value
                  this.pluginForm[7].value = this.step2.plugins[0].resultList[7].value.split(",")
                  this.pluginForm[8].value = this.step2.plugins[0].resultList[8].value
                  this.pluginForm[9].value = this.step2.plugins[0].resultList[9].value
                  this.pluginForm[10] = list
                  console.log(this.pluginForm)
                })
              }
            })
          }else{
            this.$api.requestLabelList(templateId).then(res =>{
              if(res.code === 1){
                console.log(res.data);
                this.step2.label = res.data.label
                this.step2DialogLabel = Object.assign({},res.data.label)
                this.step2.plugins = res.data.plugins
              }
            }).catch(err=>{

            })
          }

        },
        //请求落地页机构下拉菜单
        getOrgList(){
          this.$api.requestOrgList('').then(res =>{
            if(res.code ===1){
              this.orgNameList = res.data
            }
          }).catch(err => {

          })
        },
        //请求落地页项目下拉菜单
        getProjectList(){
          this.$api.requestProjectList('').then(res =>{
            if(res.code ===1){
              this.projectList = res.data
            }
          }).catch(err => {

          })
        },
        //请求样式库列表
        getStyleList(){
          this.$api.requestStyleList('').then(res =>{
            if(res.code === 1){
              this.styleList = res.data
            }
          }).catch(err =>{

          })
        },
        //按钮功能
        nextStep() {
          console.log(this.step1Save)
          if(this.step1Save){
            this.settingStepsActive = 1
            this.step1Show = false
            this.step2Show = true
          }else{
            this.saveStep1('确定保存当前修改内容并进入下一步？',false)
          }
          this.step1Save = false
        },
        lastStep() {
          this.settingStepsActive = 0
          this.step1Show = true
          this.step2Show = false
        },
        //第一步保存信息
        saveStep1(message,flag) {
          if(this.callTel1&&this.callTel2){
            this.steps1.callTel = this.callTel1 + "," + this.callTel2
          }
          if(this.steps1.projectName){
//            let selectArray = this.projectList.filter((item)=>{
//              return item.projectName == this.steps1.projectName
//            })
//            this.steps1.projectCode = selectArray[0].id
            let id = this.projectList.find(item => item.projectName == this.steps1.projectName).id
            this.steps1.projectCode = id
          }
          this.step1Warining = true
          let valArray = Object.values(this.steps1).slice(0,5)
          console.log(valArray)
          if(valArray.includes("")){
            return
          }else{
            if(JSON.stringify(this.step1SaveObject)==JSON.stringify(this.steps1)){
              //表单无变化则直接跳到第二步
              if(!flag){    //按钮不是保存
                this.settingStepsActive = 1
                this.step1Show = false
                this.step2Show = true
              }
              return
            }
            this.$alert(message, '提示信息', {
              showCancelButton: true,
              cancelButtonText: '取消',
              confirmButtonText: '确定',
              type: 'warning',
              callback: action => {
                if(action == 'confirm'){
                  console.log('提交时：',this.steps1)
                  this.$api.saveSettingStep1(this.steps1).then(res =>{
                    console.log(res)
                    if(res.code == 1){

                      //vuex中存入当前落地页pageId
                      this.$store.commit('setLandingPageId',res.data.uuid)
                      console.log('pageId:'+this.$store.getters.getLandingPageId)
                      this.steps1.uuid = this.$store.getters.getLandingPageId
                      if(flag){     //按钮是保存
                        this.$message({
                          message: '保存成功，请在列表中查看',
                          type: 'success'
                        });
                        this.step1Save = true
                      }else {
                        this.settingStepsActive = 1
                        this.step1Show = false
                        this.step2Show = true
                      }
                      this.step1SaveObject = Object.assign({},this.steps1)
                    }
                  }).catch(err =>{

                  })
                }
              }
            })
          }
          },


        //第二步选择编辑模块
        editItem(item,index){
//          console.log(item)
          this.step2BtnActive=""
          if(this.step2Active == item.name){
            this.step2Active = ""
          }else {
            this.step2Active = item.name
            this.step2Right = Object.assign({},item)
            this.step2Right.idx = index
          }

        },
        //第二步编辑菜单按钮
        editNav(name){
          this.step2Active=""
          if(this.step2BtnActive == name){
            this.step2BtnActive = ""
          }else{
            this.step2BtnActive = name
          }
        },
        //第二步添加label
        addLabel(){
          this.step2Active = ""
          this.dialogTableVisible = true
        },
        handleCheckedCitiesChange(value){
          console.log(value)

        },
        datadragEnd(evt){
          this.step2Right.idx = evt.newIndex
//          console.log('拖动前的索引 :' + evt.oldIndex)
//          console.log('拖动后的索引 :' + evt.newIndex)
        },
        //第二步删除标签
        deleteItem(item,index){
          let name  = item.name
          this.$confirm(`确定删除落地页中的 <span style="color: #0077FF;">${item.name}</span> 标签模块？</br>删除后落地页中将没有${item.name}模块的内容`, '提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            console.log(item,index)
            this.step2.label.splice(index,1)
            this.step2Active = ""
          }).catch(() => {

          });

        },
        //第二步编辑头图
        editBanner(){
          console.log("编辑头图")
          this.step2ActiveTpye = "banner"
          this.settingStepsActive = 2
          this.step2Show = false
          this.step3Show = true
        },
        //第二步编辑label
        editStyle(){
          console.log(this.step2.label[this.step2Right.idx])
          this.step2ActiveId = this.step2Right.id
          let resultList = this.step2.label[this.step2Right.idx].resultList
          let html = this.step2.label[this.step2Right.idx].html

          if(resultList){
            this.step3.status = 0
            this.step3ActiveStyleId = resultList[0].styleId
            this.$api.requestStyleId(this.step3ActiveStyleId).then(res =>{
              if(res.code === 1){
                this.activeFormList = res.data
                let _this = this
                let array = this.activeFormList.map(function (obj,index) {
                  obj.value = resultList[index].value
                  obj.formId = resultList[index].id
                  if(obj.type === 1){
                    _this["imageUrl"+index] = obj.value
                  }
                  return obj
                })
                this.activeFormList = array
                console.log(this.activeFormList)
              }
            })
          }
          if(html){
            this.step3.status = 1
            this.editorContent = html
          }else{
            this.editorContent = ""
          }
          if(!html&&!resultList){
            this.step3.status = 0
          }
          this.step2ActiveTpye = "label"
          this.settingStepsActive = 2
          this.step2Show = false
          this.step3Show = true

        },
        //第二步编辑插件
        editPlugin(){
          console.log(this.step2Right)
          this.step2ActiveId = this.step2Right.id

          this.step2ActiveTpye = "plugin"
          this.settingStepsActive = 2
          this.step2Show = false
          this.step3Show = true
        },
        //第二步保存按钮
        saveStep2(){
          console.log(this.step2.label)
          //label
          let labelParams = _.map(this.step2.label,(obj,index)=>{
            return{
              "id":obj.saveId?obj.saveId:"",
              "marketInfoId":this.$store.getters.getLandingPageId,
              "labelId":obj.id,
              "name":obj.rename?obj.rename:obj.name,
              "order":index+1,   //order从1开始
              "styleId":obj.styleId?obj.styleId:"",
              "type":1,
              "navVisibility":this.navVisibility
            }
          })
          let pluginParams = _.map(this.step2.plugins,(obj,index)=>{
            return{
              "id":obj.saveId?obj.saveId:"",
              "marketInfoId":this.$store.getters.getLandingPageId,
              "labelId":obj.id,
              "name":"",
              "order":index+1,   //order从1开始
              "styleId":"",
              "type":2,
//              "navVisibility":1
            }
          })
          let params = [...labelParams,...pluginParams]
          console.log(params)
          this.$api.saveSettingStep2(params).then(res=>{
            console.log(res)
            if(res.code === 1){
              res.data.labels.map((obj,index)=>{
                this.step2.label[index].saveId = obj.id
              })
              res.data.plugins.map((obj,index)=>{
                this.step2.plugins[index].saveId = obj.id
              })
            }
          })

        },


        //第三步

        //头图：上传图片
        handleRemove(file, fileList) {

          this.bannerFileList = fileList.map((obj,index)=>{
            return {url:obj.url}
          })
          console.log(this.bannerFileList)
        },
        handlePictureCardPreview(file) {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        },
        beforeUploadBanner(){
          this.uploadDisabled = true
        },
        uploadSuccess(response, file, fileList) {

          if(response.code === 1){
            file.url = response.data.fileUrl
            console.log(response,file,fileList)
            this.bannerFileList = fileList.map((obj,index)=>{
              return {url:obj.url}
            })

          }
          this.uploadDisabled = false
//          console.log(this.bannerFileList)

        },
        //第三步保存头图
        saveStep3Banner(){
          let resultList = this.step2.basic[0].resultList
          let fieldList = []
          for (let i = 0;i<3;i++){
            fieldList.push({
              "type":"0",
              "value":this.bannerFileList[i]?this.bannerFileList[i].url:"",
              "id":resultList?resultList[i]?resultList[i].id:"":""
            })
          }
          let params = {
            "labelId":"",
            "plannInfoId":this.$store.getters.getLandingPageId,
            "styleId":"",
            "htmlId":"",
            fieldList
          }
          console.log(params)
          this.$api.saveSettingStep3(params).then(res =>{
            console.log(res)
            if(res.code === 1){
              this.step2.basic[0].resultList = res.data.resultList
              console.log(this.step2.basic[0].resultList)
            }
          })

        },

        //点击选择样式库
        selectStyle(item,index){
          if(this.step3ActiveStyleId){
            this.$confirm('确定放弃当前编辑内容并覆盖样式?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log(item)
              this.step3ActiveStyleId = item.id
              this.initialImg()
              this.getStyleId(item.id)
            }).catch(() => {

            });
          }else{
            console.log(item)
            this.step3ActiveStyleId = item.id
            this.initialImg()
            this.getStyleId(item.id)
          }


        },
        //获取样式表单字段
        getStyleId(id){
          this.$api.requestStyleId(id).then(res =>{
            if(res.code === 1){
              this.activeFormList = res.data
//              console.log(this.activeFormList)
            }
          })
        },
        //label编辑切换模式
        step3GetStatus(value){
          if(value == 0){
            this.step3.status = 1
          }else {
            this.step3.status = 0
          }
          console.log(this.step2.label[this.step2Right.idx])
          this.$confirm('确定放弃当前编辑内容并覆盖样式？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //清空数据
            delete this.step2.label[this.step2Right.idx].resultList
            delete this.step2.label[this.step2Right.idx].html
            this.editorContent=""
            this.step3ActiveStyleId=""
            this.activeFormList=[]

            this.step3.status = value

          }).catch(() => {

          });
        },

        //样式库图片上传
        //on-success
        handleAvatarSuccess0(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl0 = res.data.fileUrl
            this.activeFormList[0].value = this.imageUrl0
            this.imgLoading0 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload0(file) {
          this.imgLoading0 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading0 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading0 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess1(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl1 = res.data.fileUrl
            this.activeFormList[1].value = this.imageUrl1
            this.imgLoading1 = false
          }else {
            console.log("网络错误")
          }

        },
        //before-upload
        beforeAvatarUpload1(file) {
          this.imgLoading1 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading1 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading1 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess2(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl2 = res.data.fileUrl
            this.activeFormList[2].value = this.imageUrl2
            this.imgLoading2 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload2(file) {
          this.imgLoading2 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading2 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading2 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess3(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl3 = res.data.fileUrl
            this.activeFormList[3].value = this.imageUrl3
            this.imgLoading3 = false
          }else{
            console.log("网络错误")
          }


        },
        //before-upload
        beforeAvatarUpload3(file) {
          this.imgLoading3 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading3 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading3 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess4(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl4 = res.data.fileUrl
            this.activeFormList[4].value = this.imageUrl4
            this.imgLoading4 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload4(file) {
          this.imgLoading4 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading4 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading4 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess5(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl5 = res.data.fileUrl
            this.activeFormList[5].value = this.imageUrl5
            this.imgLoading5 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload5(file) {
          this.imgLoading5 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading5 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading5 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess6(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl6 = res.data.fileUrl
            this.activeFormList[6].value = this.imageUrl6
            this.imgLoading6 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload6(file) {
          this.imgLoading6 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading6 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading6 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess9(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl9 = res.data.fileUrl
            this.activeFormList[9].value = this.imageUrl9
            this.imgLoading9 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload9(file) {
          this.imgLoading9 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading9 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading9 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess12(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl12 = res.data.fileUrl
            this.activeFormList[12].value = this.imageUrl12
            this.imgLoading12 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload12(file) {
          this.imgLoading12 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading12 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading12 = false
          }
          return isJPG && isLt2M;
        },
        //on-success
        handleAvatarSuccess15(res, file,fileList) {
          console.log(res)
          if(res.code === 1){
            this.imageUrl15 = res.data.fileUrl
            this.activeFormList[15].value = this.imageUrl15
            this.imgLoading15 = false
          }else {
            console.log("网络错误")
          }
        },
        //before-upload
        beforeAvatarUpload15(file) {
          this.imgLoading15 = true
          const isJPG = file.type === 'image/jpeg'||file.type === 'image/png';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG,PNG 格式!');
            this.imgLoading15 = false
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 500k!');
            this.imgLoading15 = false
          }
          return isJPG && isLt2M;
        },

        //初始化图片
        initialImg(){
          this.imgLoading0=false
          this.imageUrl0=""
          this.imgLoading1=false
          this.imageUrl1=""
          this.imgLoading2=false
          this.imageUrl2=""
          this.imgLoading3=false
          this.imageUrl3=""
          this.imgLoading4=false
          this.imageUrl4=""
          this.imgLoading5=false
          this.imageUrl5=""
          this.imgLoading6=false
          this.imageUrl6=""
          this.imgLoading9=false
          this.imageUrl9=""
          this.imgLoading12=false
          this.imageUrl12=""
          this.imgLoading15=false
          this.imageUrl15=""

        },

        //第三步保存Label
        saveStep3Label(){
          console.log(this.activeFormList)
          let fieldList = _.map(this.activeFormList,(item,idx)=>{
            console.log(this.activeFormList[idx].formId)
            return {
              "styleFieldId":this.activeFormList[idx].id,
              "type":this.activeFormList[idx].type,
              "value":this.activeFormList[idx].value,
              "id":this.activeFormList[idx].formId?this.activeFormList[idx].formId:""
            }
          })
          let params = {
            "labelId":this.step2ActiveId,
            "plannInfoId":this.$store.getters.getLandingPageId,
            "styleId":this.step3ActiveStyleId,
            "htmlId":this.step2.label[this.step2Right.idx].htmlId?this.step2.label[this.step2Right.idx].htmlId:"",
            fieldList
          }
          console.log(params)
          this.$api.saveSettingStep3(params).then(res =>{
            console.log(res)
            if(res.code === 1){
//              console.log(this.step2Right.idx)
              let index = this.step2Right.idx
              this.step2.label[index].htmlId = res.data.htmlId
              this.step2.label[index].resultList = res.data.resultList
              this.step2.label[index].styleId = this.step3ActiveStyleId
              console.log(this.step2.label[index])
            }
          })

        },
        //重置样式
        resetStyle(){
          this.step3ActiveStyleId=""
          this.activeFormList=[]
          console.log(this.activeFormList)
        },

        //第三步保存editor
        saveStep3Editor(){
          let index = this.step2Right.idx
          console.log(this.editorContent,index)
          let params = {
            "plannInfoId":this.$store.getters.getLandingPageId,
            "labelId":this.step2ActiveId,
            "htmlId":this.step2.label[this.step2Right.idx].htmlId?this.step2.label[this.step2Right.idx].htmlId:"",
            "html":this.editorContent
          }
          this.$api.saveEditorStep3(params).then(res=>{
            console.log(res)
            if(res.code === 1){
              let index = this.step2Right.idx
              this.step2.label[index].htmlId = res.data.id
              this.step2.label[index].html = this.editorContent
              console.log(this.step2.label[index])
            }
          })
        },
        changeContent(content){
          this.editorContent = content
        },
        //重置编辑器
        resetEditor(){
          this.editorContent=""
        },


        step3Cancel(){
          this.settingStepsActive = 1
          this.step2Show = true
          this.step3Show = false
          this.initialImg()
          this.step3ActiveStyleId="",
          this.activeFormList=[]
        },

        //plugin删除户型
        removeRoom(obj,idx){
          this.pluginForm[10].splice(idx,1)
          if(this.pluginForm[10].length == 0){
            this.addRoomType()
          }
        },
        //电话格式变化
        telTypeChange(val){
          this.pluginForm[2].value = ""
          this.pluginForm[2].value1 = ""
          this.pluginForm[2].value2 = ""

        },
        //plugin增加户型
        addRoomType(){
          const room = {"value":""}
          this.pluginForm[10].push(room)
        },
        //第三步保存plugin
        saveStep3Plugin(){
          console.log(this.step2.plugins[0])
          let fieldList = Object.assign({},this.pluginForm)
          if(fieldList[2].value1||fieldList[2].value2){
            fieldList[2] = {"value":`${this.pluginForm[2].value1}转${this.pluginForm[2].value2}`}
          }else{
            fieldList[2] = {"value":this.pluginForm[2].value}
          }

          let arr7 = fieldList[7].value
          if(arr7.length>0){
            fieldList[7] = {"value":arr7.join(',')}
          }else{
            fieldList[7] = {"value":""}
          }

          let arr10 = fieldList[10].map(item=>{
            return item.value
          })
          if(arr10.length>0){
            fieldList[10] = {"value":arr10.join(",")}
          }else{
            fieldList[10] = {"value":""}
          }


          let resultList = this.step2.plugins[this.step2Right.idx].resultList
          fieldList = _.map(fieldList,(obj,idx)=>{
            return {
              "id":resultList?resultList[idx]?resultList[idx].id:"":"",
              "value":obj.value
            }
          })
          let params = {
            "labelId":this.step2ActiveId,
            "plannInfoId":this.$store.getters.getLandingPageId,
            "htmlId":this.step2.plugins[0].htmlId?this.step2.plugins[0].htmlId:"",
            fieldList
          }
          console.log(params)
          this.$api.saveSettingStep3(params).then(res =>{
            console.log(res)
            if(res.code === 1){
//              console.log(this.step2Right.idx)
              let index = this.step2Right.idx
              this.step2.plugins[index].htmlId = res.data.htmlId
              this.step2.plugins[index].resultList = res.data.resultList
              console.log(this.step2.plugins[index])
            }
          })
        },


      },

      mounted() {

      },
      beforeDestroy() {
        this.$store.commit('InitialLandingPageType')
        this.$store.commit('InitialLandingPageId')
      }
    }
</script>

<style lang="scss" scoped>
  .ghost {
    opacity: 0;
    background: #C8EBFB;
  }
  .el-button{width: 100px;margin-left: 10px}
  .mb30{margin-bottom: 30px}

  #step1{
    margin-top: 30px;
    margin-bottom: 250px;
    .el-form {
      float: left;
      width: 440px;
      .el-form-item{
        margin-bottom: 20px;
        position: relative;
        .el-select{
          width: 100%!important;
        }
        span.important{
          position: absolute;
          top:0;
          right: -12px;
          color: red;
          line-height: 36px;
        }
        .callTel1{
          width:150px;

        }
        .callTel2{
          width: 80px;
        }
      }
      .tips{
        color: #8A96A0 !important;
        margin-left: 100px;
        margin-top: -8px;
        display: block;
        font-size: 12px;
      }
    }
    .warning-zone{
      width: 400px;
      height: 268px;
      float: left;
      .warning-item{
        height: 32px;
        line-height: 32px;
        margin-bottom: 20px;
        .warning-wrap{
          float: left;
          position: relative;
          padding: 0 15px;
          background-color: #FF3366;
          border-radius: 3px;
          .warning-icon{
            float: left;
            width: 14px;
            height: 14px;
            border-radius: 10px;
            text-align: center;
            margin-top: 9px;
            margin-right: 10px;
            background-color: #fff;
            color: #FF3366;
            line-height: 14px;
          }
          span{
            color: #fff;
          }
          &:before{
            content: "";
            width: 0px;
            height: 0px;
            border: 5px solid transparent;
            position: absolute;
            left: -9px;
            top: 11px;
            border-right-color: #FF3366;
          }
        }
      }
    }
  }
  #step2{
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #F2F4F8;
    .left{
      width: 912px;
      .top-setting{
        display: flex;
        padding-bottom: 30px;
        margin-bottom: 30px;
        border-bottom: 1px solid #EFF2F6;
        .item{
          position: relative;
          cursor: pointer;
          width: 100px;
          height: 100px;
          border:1px solid #E0E6ED;
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content:center;
          align-items: center;
          .icon{
            display: block;
          }
          p{
            font-size: 12px;
            height: 18px;
            line-height: 18px;
            color: #1A173B;
          }
          .edit{
            display: none;
            position: absolute;
            width: 20px;
            height: 20px;
            left: -1px;
            bottom: -1px;
            background-image: url('../../assets/landingpage/settings/edit_pen@3x.png');
            background-repeat: no-repeat;
            background-size: cover;
          }
          &.active{
            border-color: #0077ff;
            .edit{
              display: block;
            }
          }
        }
      }
      .func-setting,.plugin-setting{
        padding-bottom: 14px;
        margin-bottom: 30px;
        border-bottom: 1px solid #EFF2F6;
        .title{
          margin-top: 30px;
          height: 30px;
          margin-bottom: 30px;
        }
        .body{
          width: 928px;
          display: flex;
          flex-wrap: wrap;
          .item{
            position: relative;
            cursor: pointer;
            width: 100px;
            height: 100px;
            margin-right: 16px;
            margin-bottom: 16px;
            border:1px solid #E0E6ED;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content:center;
            align-items: center;
            .icon{
              display: block;
            }
            p{
              font-size: 12px;
              height: 18px;
              line-height: 18px;
              color: #1A173B;
            }
            .edit{
              display: none;
              position: absolute;
              width: 20px;
              height: 20px;
              left: -1px;
              bottom: -1px;
              background-image: url('../../assets/landingpage/settings/edit_pen@3x.png');
              background-repeat: no-repeat;
              background-size: cover;
            }
            .dl{
              position: absolute;
              width: 20px;
              height: 20px;
              right: 0px;
              top: 0px;
              background-image: url('../../assets/landingpage/settings/edit.delete@3x.png');
              background-repeat: no-repeat;
              background-size: cover;
            }
            &.active{
              border-color: #0077ff;
              .edit{
                display: block;
              }
            }
            &.add{
              border: 1px dashed #E0E6ED;

            }
          }
        }
      }
    }
    .right{
      width: 400px;
      padding-bottom: 30px;
      margin-left: 78px;
      .wrap{
        border-left: 1px solid #C0CCDA;
        height: 100%;
        border-top: 1px solid #F2F4F8;
        border-bottom: 1px solid #F2F4F8;
        padding: 30px;
        .title{
          height: 64px;
          line-height: 40px;
          color: #1A173B;
          border-bottom: 1px solid #E0E6ED;
          .title-icon{
            display: block;
            float: left;
            margin-right: 12px
          }
          .title-name{
            float: left;
          }
        }
        .form{
          .form-item{
            height: 64px;
            border-bottom: 1px solid #E0E6ED;
            .form-item-name{
              float: left;
              height: 63px;
              line-height: 63px;
            }
            .form-item-input{
              width: 100px;
              float: right;
              margin-top: 16px;
              font-size: 12px;
            }
            .radio{
              float: right;
              margin-top: 23px;
            }
          }
        }
        .form-item-btn{
          width: 100%!important;
          margin-left: 0px!important;
          margin-top: 32px;
        }
      }
    }
  }
  #step3{
    .title{
      margin-bottom: 20px;
      color: #1A173B;
      font-size: 16px;
    }
    #banner-setting{
      .label{
        float: left;
        width: 80px;
        color: #8A96A0;
      }
      .img-upload{
        float: left;
        .el-upload-dragger .el-upload__text{
          position: absolute;
          top: -20px;
          width: 100%;
        }
      }

    }
    #label-setting{
      min-height: 400px;
      border-bottom: 1px solid #F2F4F8;
      .content{
        display: flex;
        .styel-list{
          min-height: 400px;
          width: 375px;
          border-right: 1px solid #EFF2F6;
          padding-top: 30px;
          .style-list-ltem{
            .list{
              width: 352px;
              display: flex;
              flex-wrap: wrap;
              margin-bottom: 32px;
              .list-item{
                width: 80px;
                height: 106px;
                margin-right: 8px;
                margin-bottom: 8px;
                background-image: url("../../assets/example.png");
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                &.active{
                  box-shadow: 0px 0px 6px 0px rgba(0,119,255,0.8), 0px 2px 4px 0px rgba(0,119,255,0.9)
                }
              }
            }
          }

        }
        .from-list{
          width: 586px;
          min-height: 400px;
          padding: 30px;
          border-right:1px solid #F2F4F8;
          margin-right: 30px;
          .el-form-item{
            margin-bottom: 20px;
          }
        }
        .pic-list{
          padding-top: 30px;
          width: 388px;
          min-height: 400px;
        }
      }
    }
    #plugin-setting{
      .plugin-form-top{
        padding: 20px 0;
        border-bottom: 1px solid #E0E6ED;
        img{
          float: left;
        }
        .name{
          float: left;
          line-height: 40px;
          font-size: 14px;
          color: #1a173b;
          margin-left: 12px;
        }
      }
      .plugin-form-wrap{
        padding: 30px 0;
        border-bottom: 1px solid #E0E6ED;
        .el-form{
          color: #1F2D3D!important;

          .el-form-item {
            margin-bottom: 20px;
            position: relative;

            .callTel{
              width: 200px;
            }
            .callTel1{
              width: 150px;
            }
            .callTel2{
              width: 80px;
            }
            .callTel3{
              width: 120px;
            }
            .color-picker{
              position: absolute!important;
              margin-left: 20px;
            }

            span.important {
              position: absolute;
              top: 0;
              right: -16px;
              color: red;
              line-height: 16px;
            }
          }
        }
      }
    }

  }
</style>



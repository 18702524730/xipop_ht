<template>
  <div class="seniorsearchsebe">
    <div class="seniorconditions">
      <div class="countries">
        <div class="all">
          <el-checkbox v-model="all">全部国家和地区</el-checkbox>
        </div>
        <div class="allcountry">
          <div class="each" v-for="(item, index) in list" :key="index">
            <el-checkbox v-model="item.ischeck" @change="dosome(item)"  :title="item.valueName">
                <span class="countryiconbox" v-if="item.icon"><img :src="item.icon.replace('open.sipop.cn','ipop.scjg.xm.gov.cn')" alt=""/></span><span style="vertical-align:middle;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;display:inline-block;max-width:80px;">{{ item.valueName }}</span><span style="vertical-align:middle">({{ item.value }})</span>
            </el-checkbox>
            <div style="padding-left: 30px;" v-if="item.list">
              <el-checkbox-group v-model="item.checked" @change="check(item)">
                <el-checkbox v-for="t in item.list" :label="t.value" :key="t.value">{{ t.valueName }}</el-checkbox>
              </el-checkbox-group>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="tabsbtn">
          <span  @click="qiehuan('1')"  :class="{active: current === '1'}">简单检索</span>
          <span  @click="qiehuan('2')"  :class="{active: current === '2'}">高级检索</span>
          <span  @click="qiehuan('3')"  :class="{active: current === '3'}">表达式检索</span>
        </div>
        <div v-if="current === '3'" class="forms clearfix">
          <div class="bdstitle">
            <h3>检索表达式 <span class="different" @click="differFn">国别</span><span class="more" @click="moreFn">更多字段</span><span class="help" @click="helpshow = true"><span>使用帮助</span><span class="helpmark">?</span></span></h3>
            <p><el-input v-model="expression" placeholder="请输入需要检索的内容，或直接编辑表达式" type="textarea" :autosize="{ minRows: 3, maxRows: 6}"></el-input></p>
            <div class="bdsbtns">
              <span class="jiansuo" @click="jiansuo">检索</span><span class="qingkong" @click="clearexpression">清空</span><span class="lishi" @click="openhistory">历史检索式</span>
            </div>
          </div>
          
          <div class="allzdbox">
            <div class="scbds">
              <span class="scbdsbtn" @click="createbds">生成检索式</span>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">号码 <span class="openorclose" v-show="hmshow" @click="closeitem('hm')">收起</span><span class="openorclose" v-show="!hmshow" @click="openitem('hm')">打开</span></h3>
              <div class="clearfix" v-show="hmshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="sqhtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="sqhval" class="sqh"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('sqh')">
                          +
                        </div>
                        <div class="popbox">
                          <p>格式：国别代码+流水号+校验位</p>
                          <p>例：CN202010445788.2</p>
                          <!-- <p>支持模糊匹配</p> -->
                        </div>
                      </li>
                      <li v-for="(it, key) in sqhaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('sqh',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      优先权号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="yxqhtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="yxqhval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('yxqh')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in yxqhaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('yxqh',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      公开号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="gkhtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="gkhval" class="sqh"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('gkh')">
                          +
                        </div>
                        <div class="popbox">
                          <p>格式：国别代码+流水号</p>
                          <p>例：cn103483447 或 WO2019011331</p>
                        </div>
                      </li>
                      <li v-for="(it, key) in gkhaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('gkh',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">名称地址<span class="openorclose" v-show="mcdzshow" @click="closeitem('mcdz')">收起</span><span class="openorclose" v-show="!mcdzshow" @click="openitem('mcdz')">打开</span></h3>
              <div class="clearfix" v-show="mcdzshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="sqrentype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="sqrenval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('sqren')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqrenaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('sqren',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      代理人
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="dlrtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="dlrval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('dlr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in dlraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('dlr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人国别
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="sqgbtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-select v-model="sqgbval">
                            <el-option v-for="it in list" :key="it.value" :value="it.value" :label="it.valueName">{{it.valueName}}</el-option>
                          </el-select>
                          <!-- <el-input v-model="sqgbval"></el-input> -->
                        </div>
                        <div class="addbtn" @click="additem('sqgb')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqgbaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-select v-model="it.value">
                            <el-option v-for="its in list" :key="its.value" :value="its.value" :label="its.valueName">{{its.valueName}}</el-option>
                          </el-select>
                          <!-- <el-input v-model="it.value"></el-input> -->
                        </div>
                        <div class="addbtn" @click="delitem('sqgb',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人省
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="sqsstype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="sqssval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('sqss')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqssaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('sqss',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      发明人
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="fmrtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="fmrval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('fmr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in fmraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('fmr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      代理机构
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="dljgtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="dljgval" class="sqh"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('dljg')">
                          +
                        </div>
                        <div class="popbox">
                          <p>支持全字符匹配，支持空格输入；不支持运算符</p>
                        </div>
                      </li>
                      <li v-for="(it, key) in dljgaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('dljg',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      发明人国别
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="fmgbtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-select v-model="fmgbval">
                            <el-option v-for="it in list" :key="it.value" :value="it.value" :label="it.valueName">{{it.valueName}}</el-option>
                          </el-select>
                          <!-- <el-input v-model="fmgbval"></el-input> -->
                        </div>
                        <div class="addbtn" @click="additem('fmgb')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in fmgbaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-select v-model="it.value">
                            <el-option v-for="its in list" :key="its.value" :value="its.value" :label="its.valueName">{{its.valueName}}</el-option>
                          </el-select>
                          <!-- <el-input v-model="it.value"></el-input> -->
                        </div>
                        <div class="addbtn" @click="delitem('fmgb',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请人市
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="sqshitype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="sqshival"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('sqshi')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqshiaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('sqshi',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">关键字 <span class="openorclose" v-show="gjzshow" @click="closeitem('gjz')">收起</span><span class="openorclose" v-show="!gjzshow" @click="openitem('gjz')">打开</span></h3>
              <div class="clearfix" v-show="gjzshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      所有字段
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="sytype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="syval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('sy')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in syaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('sy',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      摘要
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="zytype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="zyval" class="sqh"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('zy')">
                          +
                        </div>
                        <div class="popbox">
                          <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV or 人乳头瘤检索</p>
                          <p>②支持or、and、not运算符的使用，例如HPV or人乳头瘤，HPV and 疫苗</p>
                        </div>
                      </li>
                      <li v-for="(it, key) in zyaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('zy',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      说明书
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="smshutype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="smshuval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('smshu')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in smshuaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('smshu',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      专利名称
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="zlmctype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="zlmcval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('zlmc')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in zlmcaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('zlmc',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      权利要求
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="qlyqtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="qlyqval" class="sqh"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('qlyq')">
                          +
                        </div>
                        <div class="popbox">
                          <p>①支持全字符匹配，支持空格输入，例如输入HPV 人乳头瘤，按HPV or 人乳头瘤检索</p>
                          <p>②支持or、and、not运算符的使用，例如HPV or人乳头瘤，HPV and 疫苗</p>
                        </div>
                      </li>
                      <li v-for="(it, key) in qlyqaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('qlyq',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch">
              <h3 class="itemsearchtitle">日期 <span class="openorclose" v-show="rqshow" @click="closeitem('rq')">收起</span><span class="openorclose" v-show="!rqshow" @click="openitem('rq')">打开</span></h3>
              <div class="clearfix" v-show="rqshow">
                <div class="itemsearcheachline">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      申请日
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="sqrtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><el-input v-model="sqrval.start" placeholder="请输入开始日期，如20190213"></el-input></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><el-input v-model="sqrval.end" placeholder="请输入结束日期，如20190213"></el-input></span>
                          <!-- <el-date-picker
                            v-model="sqrval"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="additemdate('sqr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in sqraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><el-input v-model="it['value']['start']" placeholder="请输入开始日期，如20190213"></el-input></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><el-input v-model="it['value']['end']" placeholder="请输入结束日期，如20190213"></el-input></span>
                          <!-- <el-date-picker
                            v-model="it.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="delitem('sqr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      公开日
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="gkrtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><el-input v-model="gkrval.start" placeholder="请输入开始日期，如20190213"></el-input></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><el-input v-model="gkrval.end" placeholder="请输入结束日期，如20190213"></el-input></span>
                          <!-- <el-date-picker
                            v-model="gkrval"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="additemdate('gkr')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in gkraddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <span class="fl start"><el-input v-model="it['value']['start']" placeholder="请输入开始日期，如20190213"></el-input></span>
                          <span class="fl zhi">至</span>
                          <span class="fl end"><el-input v-model="it['value']['end']" placeholder="请输入结束日期，如20190213"></el-input></span>
                          <!-- <el-date-picker
                            v-model="it.value"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                          >
                          </el-date-picker> -->
                        </div>
                        <div class="addbtn" @click="delitem('gkr',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      转让年
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="zrntype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <el-input v-model="zrnval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('zrn')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in zrnaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('zrn',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      许可年
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="xkntype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <el-input v-model="xknval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('xkn')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in xknaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('xkn',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      质押年
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="zyntype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <el-input v-model="zynval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('zyn')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in zynaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchvalline">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('zyn',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="itemsearch" style="margin-bottom: 0;">
              <h3 class="itemsearchtitle">分类号 <span class="openorclose" v-show="flhshow" @click="closeitem('flh')">收起</span><span class="openorclose" v-show="!flhshow" @click="openitem('flh')">打开</span></h3>
              <div class="clearfix" v-show="flhshow">
                <div class="itemsearcheach fl">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      IPC分类号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="ipctype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="ipcval" class="sqh"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('ipc')">
                          +
                        </div>
                        <div class="popbox">
                          <p>支持分类号完全匹配，支持空格输入，例如C07K7/06 C07K16/18，按C07K7/06 or C07K16/18检索</p>
                        </div>
                      </li>
                      <li v-for="(it, key) in ipcaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('ipc',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      国民经济分类
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="gmjjtype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="gmjjval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('gmjj')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in gmjjaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('gmjj',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div class="itemsearcheach fr">
                  <div class="itemsearchit clearfix">
                    <div class="itemsearchlabel fl">
                      CPC分类号
                    </div>
                    <ul class="itemsearchlist fl">
                      <li>
                        <div class="itemsearchtype">
                          <el-select v-model="cpctype">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="cpcval"></el-input>
                        </div>
                        <div class="addbtn" @click="additem('cpc')">
                          +
                        </div>
                      </li>
                      <li v-for="(it, key) in cpcaddlist" :key="it.id">
                        <div class="itemsearchtype">
                          <el-select v-model="it.type">
                            <el-option v-for="it in selectopts" :key="it" :value="it" :label="it">{{it}}</el-option>
                          </el-select>
                        </div>
                        <div class="itemsearchval">
                          <el-input v-model="it.value"></el-input>
                        </div>
                        <div class="addbtn" @click="delitem('cpc',key)">
                          -
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="scbds">
              <span class="scbdsbtn" @click="createbds">生成检索式</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="helppicbox" v-if="helpshow" @click="helpshow = false">
      <div class="helppic" >
        <img src="@assets/img/bz.png" alt="">
      </div>
    </div>
    <div v-if="historyshow" class="result_typebox">
        <div class="tablebox">
            <div class="historyclose"><i class="el-icon-close" @click="closehistory"></i></div>
            <table class="result_type">
                <thead>
                    <tr class="thead">
                        <th width="100" class="firstone"><el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllCheckChange">全选</el-checkbox></th>
                        <th width="640">表达式</th>
                        <th width="100">检索库</th>
                        <th width="100">命中数</th>
                        <th width="150">检索时间</th>
                        <th width="60">操作</th>
                    </tr>
                </thead>
                <tbody class="tr-color">
                    <tr :class="{hover:item.checked}" v-for="(item, index) in dataList" v-show="!loading && dataList.length" :key="index">
                        <td class="firstone"><el-checkbox v-model="item.checked" @change="handleCheckChange(item)"></el-checkbox></td>
                        <td :title="item.expression">{{item.expression}}</td>
                        <td>{{item.searchDatabase}}</td>
                        <td>{{item.hits}}</td>
                        <td>{{item.createTime | dateFormat }}</td>
                        <td class="alignc action">
                            <a href="#" class="view" @click.prevent="topatent(item)">查看</a>
                        </td>
                    </tr>
                    <tr class="empty" v-show="!loading && !dataList.length">
                        <td colspan="6" class="norecord">
                            <div class="empty_ic"><span>暂无信息</span></div>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="opbtns" v-if="dataList.length && !loading"><span class="delbtn" @click="delall">删除</span><span class="join">合并：</span><span class="andbtn" @click="joinall('AND')">AND</span><span class="orbtn" @click="joinall('OR')">OR</span></div>
        </div>
    </div>
  </div>
</template>

<script>
// import { judgeState } from '@utils/util.js'
// import filters from '@utils/filters.js'
// import $ from 'jquery'
const cityUrl = '/api/queryProvinceCity'
const condition = {
  an: null,
  pn: null,
  applicantSearch: null,
  in: null,
  cl: null,
  ab: null,
  ic: null,
  agentOrgSearch: null,
  agentSearch: null,
  ti: null,
  dz: null
}
const treeData = [
  {
    id: 0,
    label: '全部国家',
    children: [
      {
        id: 2,
        label: '中国',
        children: [
          {
            id: 21,
            label: '发明'
          },
          {
            id: 22,
            label: '实用新型'
          },
          {
            id: 23,
            label: '外观设计'
          }
        ]
      },
      {
        id: 3,
        label: '美国'
      },
      {
        id: 4,
        label: '日本'
      },
      {
        id: 5,
        label: '韩国'
      },
      {
        id: 6,
        label: '欧专局'
      },
      {
        id: 7,
        label: '英国'
      },
      {
        id: 8,
        label: '法国'
      },
      {
        id: 9,
        label: '俄罗斯'
      },
      {
        id: 10,
        label: '其他国家和地区'
      }
    ]
  }
]

export default {
  data() {
    return {
      sqh: false,
      helpshow: false,
      historyshow: false,
      loading: false,
      dataList: [],
      selectedItems: [],
      options: [],
      date1: '',
      date2: '',
      expression: '',
      selectopts: [
        'AND','OR','NOT'
      ],
      sf: [],
      'ap-province': '',
      'ap-city': '',
      hasprovince: true,
      all: true,
      label: ['普通搜索', '高级搜索'],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      cities: [
        { name: '国内', key: '1' },
        { name: '国外', key: '2' }
      ],
      checkedCities: [],
      cont: '',
      cobj: { ...condition },
      ishow: false,
      treeData: treeData,
      current: '3',
      
      checklist: [],
      defaultExpandedKeys: [],
      defaultCheckedKeys: [],
      checkedKeys: [],
      curSelectedSmallIdList: [],
      sqdate: 0,
      gkdate: 0,
      
      tabs: [
        { name: '简单检索', id: 1 },
        { name: '高级检索', id: 2 },
        { name: '检索式检索', id: 3 }
      ],
      list: [
        {
          field: 'dac',
          value: 'CN',
          valueName: '中国',
          count: 15329459,
          percent: '55.95',
          ischeck: false,
          checked: [],
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/CN.png',
          list: [
            { field: 'f-kind', value: '01', valueName: '发明专利', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '02', valueName: '实用新型', count: 9516527, percent: '62.08', icon: null },
            { field: 'f-kind', value: '03', valueName: '外观设计', count: 5812932, percent: '37.92', icon: null }
          ]
        },
        {
          field: 'dac',
          value: 'US',
          valueName: '美国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/US.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'JP',
          valueName: '日本',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/JP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'KR',
          valueName: '韩国',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/KR.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'EP',
          valueName: '欧专局',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/EP.png',
          ischeck: false,
          list: null
        },
        {
          field: 'dac',
          value: 'WO',
          valueName: '世界知识产权组织',
          icon: 'http://open.sipop.cn/dataplatpro/static/sipop/images/country/WO.png',
          ischeck: false,
          list: null
        },
        // {
        //     field: "dac", value: "GB", valueName: "英国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/GB.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "FR", valueName: "法国",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/FR.png",
        //     ischeck: false,
        //     list: null
        // },
        // {
        //     field: "dac", value: "RU", valueName: "俄罗斯",
        //     icon: "http://open.sipop.cn/dataplatpro/static/sipop/images/country/RU.png",
        //     ischeck: false,
        //     list: null
        // },
        {
          field: 'dac',
          value: 'ELSE',
          valueName: '其他国家和地区',
          count: 1559,
          percent: '5.95',
          icon: null,
          ischeck: false,
          list: null
        }
      ],
      // 申请号
      sqhtype: 'AND',
      sqhval: '',
      sqhaddlist: [],
      // 公开号
      gkhtype: 'AND',
      gkhval: '',
      gkhaddlist: [],
      // 优先权号
      yxqhtype: 'AND',
      yxqhval: '',
      yxqhaddlist: [],
      // 申请人
      sqrentype: 'AND',
      sqrenval: '',
      sqrenaddlist: [],
      // 发明人
      fmrtype: 'AND',
      fmrval: '',
      fmraddlist: [],
      // 代理人
      dlrtype: 'AND',
      dlrval: '',
      dlraddlist: [],
      // 代理机构
      dljgtype: 'AND',
      dljgval: '',
      dljgaddlist: [],
      // 申请人国别
      sqgbtype: 'AND',
      sqgbval: '',
      sqgbaddlist: [],
      // 发明人国别
      fmgbtype: 'AND',
      fmgbval: '',
      fmgbaddlist: [],
      // 申请人省市
      sqsstype: 'AND',
      sqssval: '',
      sqssaddlist: [],
      sqshitype: 'AND',
      sqshival: '',
      sqshiaddlist: [],
      // 所有字段
      sytype: 'AND',
      syval: '',
      syaddlist: [],
      // 专利名称
      zlmctype: 'AND',
      zlmcval: '',
      zlmcaddlist: [],
      // 摘要
      zytype: 'AND',
      zyval: '',
      zyaddlist: [],
      // 权利要求
      qlyqtype: 'AND',
      qlyqval: '',
      qlyqaddlist: [],
      // 说明书
      smshutype: 'AND',
      smshuval: '',
      smshuaddlist: [],
      // 申请日
      sqrtype: 'AND',
      sqrval: {
        start: '',
        end: ''
      },
      sqraddlist: [],
      // 公开日
      gkrtype: 'AND',
      gkrval: {
        start: '',
        end: ''
      },
      gkraddlist: [],
      // 转让年
      zrntype: 'AND',
      zrnval: '',
      zrnaddlist: [],
      // 许可年
      xkntype: 'AND',
      xknval: '',
      xknaddlist: [],
      // 质押年
      zyntype: 'AND',
      zynval: '',
      zynaddlist: [],
      // IPC分类号
      ipctype: 'AND',
      ipcval: '',
      ipcaddlist: [],
      // CPC分类号
      cpctype: 'AND',
      cpcval: '',
      cpcaddlist: [],
      // 国民经济分类
      gmjjtype: 'AND',
      gmjjval: '',
      gmjjaddlist: [],
      hmshow: true,
      mcdzshow: true,
      gjzshow: true,
      rqshow: true,
      flhshow: true,
      isIndeterminate: false,
      checkAll: false

    }
  },
  watch: {
    all() {
      this.list.forEach(item => {
        item.ischeck = this.all
        this.dosome(item)
        if (item.ischeck) {
          const arr = []
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                arr.push(it.value)
              }
            })
          }
          item.checked = arr
        } else {
          item.checked = []
        }
      })
    }
  },
  // filters: {
  //     dateFormat: filters.formatDate.datesFormat
  // },
  methods: {
    moreFn() {
      var link1 = this.$router.resolve({ name: 'searchMore' })
      window.open(link1.href, '_blank')
    },
    differFn() {
      var link2 = this.$router.resolve({ name: 'searchDiffer' })
      window.open(link2.href, '_blank')
    },
    topatent(item) {
      const ret = this.getkeys()
      const re = ret.re
      const type = ret.type
      const queryobj = {}
      if (re.length) {
        const str = re.join(',')
        queryobj.dac = str
      }
      if (type.length) {
        const strt = type.join(',')
        queryobj.fKind = strt
      }
      queryobj.expression = item.expression
      queryobj.searchType = 3
      const url = '/portal/search/patent-searchlist?' + this.objtostr(queryobj)
      window.open(url)
      // this.$router.push({ path: '/portal/search/patent-searchlist', query: queryobj })
    },
    clearall() {
      // 申请号
      this.sqhval = ''
      this.sqhaddlist = []
      // 公开号
      this.gkhval = ''
      this.gkhaddlist = []
      // 优先权号
      this.yxqhval = ''
      this.yxqhaddlist = []
      // 申请人
      this.sqrenval = ''
      this.sqrenaddlist = []
      // 发明人
      this.fmrval = ''
      this.fmraddlist = []
      // 代理人
      this.dlrval = ''
      this.dlraddlist = []
      // 代理机构
      this.dljgval = ''
      this.dljgaddlist = []
      // 申请人国别
      this.sqgbval = ''
      this.sqgbaddlist = []
      // 发明人国别
      this.fmgbval = ''
      this.fmgbaddlist = []
      // 申请人省市
      this.sqssval = ''
      this.sqssaddlist = []
      this.sqshival = ''
      this.sqshiaddlist = []
      // 所有字段
      this.syval = ''
      this.syaddlist = []
      // 专利名称
      this.zlmcval = ''
      this.zlmcaddlist = []
      // 摘要
      this.zyval = ''
      this.zyaddlist = []
      // 权利要求
      this.qlyqval = ''
      this.qlyqaddlist = []
      // 说明书
      this.smshuval = ''
      this.smshuaddlist = []
      // 申请日
      this.sqrval = {
        start: '',
        end: ''
      }
      this.sqraddlist = []
      // 公开日
      this.gkrval = {
        start: '',
        end: ''
      }
      this.gkraddlist = []
      // 转让年
      this.zrnval = ''
      this.zrnaddlist = []
      // 许可年
      this.xknval = ''
      this.xknaddlist = []
      // 质押年
      this.zynval = ''
      this.zynaddlist = []
      // IPC分类号
      this.ipcval = ''
      this.ipcaddlist = []
      // CPC分类号
      this.cpcval = ''
      this.cpcaddlist = []
      // 国民经济分类
      this.gmjjval = ''
      this.gmjjaddlist = []
    },
    openhistory() {
        this.getOrderList()
    },
    closehistory() {
        this.selectedItems = []
        this.checkAll = false
        this.historyshow = false
    },
    delall() {
        if (!this.selectedItems.length) {
            this.$message.warning('请选中记录')
            return 
        }
        this.$confirmsebe('您确定删除选中记录吗？', '提示', {
            type: 'warning'
        }).then(() => {
            const arr = []
            this.selectedItems.forEach(item => {
                arr.push(item.id)
            })
            const str = arr.join(',')
            this.$http.delete('/api/deleteExpressionHistory?ids=' + str).then(res => {
                this.$message.success('删除成功')
                this.selectedItems = []
                this.getOrderList()
            }).catch(err => {
                this.$message.error(err.response.data.msg || '操作失败')
            })
        })
        
    },
    joinall(tp) {
        if (this.selectedItems.length < 2) {
            this.$message.warning('请至少选中2条记录')
            return 
        }
        const ret = this.getkeys()
        const re = ret.re
        const type = ret.type
        const queryobj = {}
        if (re.length) {
            const str = re.join(',')
            queryobj.dac = str
        }
        if (type.length) {
            const strt = type.join(',')
            queryobj.fKind = strt
        }
        const arr = []
        this.selectedItems.forEach(item => {
            arr.push(item.expression)
        })
        queryobj.expression = arr.join(` ${tp} `)
        queryobj.searchType = 3
        const url = '/portal/search/patent-searchlist?' + this.objtostr(queryobj)
        window.open(url)
        // this.$router.push({ path: '/portal/search/patent-searchlist', query: queryobj })
    },
    getOrderList() {
        this.loading = true
        const listUrl = '/api/findExpressionHistoryList'
        this.$http.get(listUrl)
        .then((resp) => {
            this.loading = false
            var dataList = resp.data
            dataList.forEach((item, i) => {
                // var arr = this.selectedItems;
                // var idx = this.inArrayOf(arr, item, 'id');
                // item.checked = idx !== -1;
                item.checked = false
            })
            this.dataList = dataList
            this.historyshow = true
            // this.checkIsAll();
        })
        .catch((err) => {
            this.loading = false
            this.$message.error(err.response.data.msg || '获取失败')
        })
    },
    checkIsAllSelected() {
        var dataList = this.dataList
        var temp = 0
        dataList.forEach((item, i) => {
            if (item.checked) {
                temp += 1
            }
        })
        return temp === dataList.length
    },
    inArrayOf(arr, sortItem, sortName) {
        var ret = -1
        arr.forEach((item, i) => {
            if (item[sortName] === sortItem[sortName]) {
                ret = i
                return false
            }
        })
        return ret
    },
    handleCheckChange(item) {
        var arr = this.selectedItems
        var idx = this.inArrayOf(arr, item, 'id')
        if (idx !== -1) {
            arr.splice(idx, 1)
        } else {
            arr.push(item)
        }
        if (!item.checked) {
            this.isIndeterminate = true
        } else if (this.checkIsAllSelected()) {
            this.checkAll = true
            this.isIndeterminate = false
        }
        if (arr.length === 0) {
            this.checkAll = false
            this.isIndeterminate = false
        }
    },
    checkIsAll() {
        var self = this
        var arr = this.selectedItems
        var dataList = this.dataList
        var ret = true
        self.isIndeterminate = false
        self.checkAll = false
        // 没有获取到数据的时候选择框不选中
        if (dataList.length) {
            dataList.forEach((item, i) => {
                var idx = self.inArrayOf(arr, item, 'id')
                if (idx === -1) {
                    ret = false
                    return false
                }
            })
        } else {
            ret = false
        }
        self.checkAll = ret
    },
    handleAllCheckChange() {
        this.isIndeterminate = false
        var self = this
        var arr = this.selectedItems
        var dataList = this.dataList
        // 处理选中的数据
        dataList.forEach((item, i) => {
            var idx = self.inArrayOf(arr, item, 'id')
            if (self.checkAll) {
                item.checked = true
                if (idx === -1) {
                    arr.push(item)
                }
            } else {
                item.checked = false
                if (idx !== -1) {
                    arr.splice(idx, 1)
                }
            }
        })
    },
    closeitem(tp) {
      this[tp + 'show'] = false
    },
    openitem(tp) {
      this[tp + 'show'] = true
    },
    clearexpression() {
      this.expression = ''
    },
    arrtostr(arr, tp) {
      if (!arr.length || !arr) {
        return ''
      }
      let str = ` ${arr[0]['type']} ${tp}:(${arr[0]['value']}`
      if (arr.length === 1) {
        return str + ')'
      }
      for (let i = 1; i < arr.length; i++) {
        str += ` ${arr[i]['type']} ${arr[i]['value']}`
      }
      return str + ')' 
    },
    datetostr(d) {
      if (!d) {
        return null
      }
      const odate = new Date(d)
      const y = odate.getFullYear()
      const m = odate.getMonth() + 1
      const od = odate.getDate()
      const mm = m > 9 ? m : '0' + m
      const dd = od > 9 ? od : '0' + od 
      return y + mm + dd
    },
    arrdatetostr(arr, tp) {
      if (!arr.length || !arr) {
        return ''
      }
      let str = ''
      // if (arr[0]['value']['start'] && arr[0]['value']['end']) {
      //   str = ` ${arr[0]['type']} ${tp}:({${arr[0]['value']['start']} TO ${arr[0]['value']['end']}}`
      // }
      // if (arr[0]['value']['start'] && !arr[0]['value']['end']) {
      //   str = ` ${arr[0]['type']} ${tp}:(${arr[0]['value']['start']}`
      // }
      // if (!arr[0]['value']['start'] && arr[0]['value']['end']) {
      //   str = ` ${arr[0]['type']} ${tp}:(${arr[0]['value']['end']}}`
      // }
      
      // if (arr.length === 1) {
      //   return str + ')'
      // }
      // for (let i = 1; i < arr.length; i++) {
      //   let itstr = ''
      //   if (arr[i]['value']['start'] && arr[i]['value']['end']) {
      //   itstr = ` ${arr[i]['type']} {${arr[i]['value']['start']} To ${arr[i]['value']['end']}}`
      //   }
      //   if (arr[i]['value']['start'] && !arr[i]['value']['end']) {
      //     itstr = ` ${arr[i]['type']} ${arr[i]['value']['start']}`
      //   }
      //   if (!arr[i]['value']['start'] && arr[i]['value']['end']) {
      //     itstr = ` ${arr[i]['type']} ${arr[i]['value']['end']}`
      //   }
      //   str += itstr
      // }
      // return str + ')' 

      for (let i = 0; i < arr.length; i++) {
        let itstr = ''
        if (arr[i]['value']['start'] && arr[i]['value']['end']) {
          itstr = ` ${arr[i]['type']} ${tp}:({${arr[i]['value']['start']} TO ${arr[i]['value']['end']}})`
        }
        if (arr[i]['value']['start'] && !arr[i]['value']['end']) {
          itstr = ` ${arr[i]['type']} ${tp}:(${arr[i]['value']['start']})`
        }
        if (!arr[i]['value']['start'] && arr[i]['value']['end']) {
          itstr = ` ${arr[i]['type']} ${tp}:(${arr[i]['value']['end']})`
        }
        str += itstr
      }
      return str
    },
    createarr(tp) {
      const ret = []
      const arr = this[tp + 'addlist']
      const val = this[tp + 'val']
      const type = this[tp + 'type']
      if (tp === 'sqr' || tp === 'gkr') {
        if (!this.isempty(val)) {
          ret.push({ value: val, type: type })
        }
      } else {
        if (val) {
          ret.push({ value: val, type: type })
        }
      }
      if (arr.length) {
        arr.forEach((item) => {
          if (item.value) {
            ret.push(item)
          }
          
        })
      }
      return ret
    },
    createbds() {
      // 申请号 an
      const sqh = this.arrtostr(this.createarr('sqh'), 'anc-an')
      // 公开号 pn
      const gkh = this.arrtostr(this.createarr('gkh'), 'pnc-pn')
      // 优先权号 pr
      const yxqh = this.arrtostr(this.createarr('yxqh'), 'pr')
      // 申请人 pa
      const sqren = this.arrtostr(this.createarr('sqren'), 'pa')
      // 发明人 in
      const fmr = this.arrtostr(this.createarr('fmr'), 'in')
      // 代理人 at
      const dlr = this.arrtostr(this.createarr('dlr'), 'at')
      // 代理机构 ag
      const dljg = this.arrtostr(this.createarr('dljg'), 'ag')
      // 申请人国别 ap-country
      const sqgb = this.arrtostr(this.createarr('sqgb'), 'ap-country')
      // 发明人国别 in-country
      const fmgb = this.arrtostr(this.createarr('fmgb'), 'in-country')
      // 申请人省市 ap-province
      const sqss = this.arrtostr(this.createarr('sqss'), 'ap-province')
      const sqshi = this.arrtostr(this.createarr('sqshi'), 'ap-city')
      // 所有字段 all
      const sy = this.arrtostr(this.createarr('sy'), 'all')
      // 专利名称 ti
      const zlmc = this.arrtostr(this.createarr('zlmc'), 'ti')
      // 摘要 ab
      const zy = this.arrtostr(this.createarr('zy'), 'ab')
      // 权利要求 cl
      const qlyq = this.arrtostr(this.createarr('qlyq'), 'cl')
      // 说明书 ds
      const smshu = this.arrtostr(this.createarr('smshu'), 'ds')
      // 申请日 ad
      const sqr = this.arrdatetostr(this.createarr('sqr'), 'ad')
      // 公开日 pd
      const gkr = this.arrdatetostr(this.createarr('gkr'), 'pd')
      // 转让年 assignyear
      const zrn = this.arrtostr(this.createarr('zrn'), 'assignyear')
      // 许可年 licenseyear
      const xkn = this.arrtostr(this.createarr('xkn'), 'licenseyear')
      // 质押年 pled-year
      const zyn = this.arrtostr(this.createarr('zyn'), 'pled-year')
      // ipc分类号 ic
      const ipc = this.arrtostr(this.createarr('ipc'), 'ic')
      // cpc分类号 ipc-subgroup
      const cpc = this.arrtostr(this.createarr('cpc'), 'ipc-subgroup')
      // 国民经济分类 nation-class
      const gmjj = this.arrtostr(this.createarr('gmjj'), 'nation-class')
      const exp = sqh + gkh + yxqh + sqren + fmr + dlr + dljg + sqgb + fmgb + sqss + sqshi + sy + zlmc + zy + qlyq + smshu + sqr + gkr + zrn + xkn + zyn + ipc + cpc + gmjj
      if (!exp) {
        this.$message.warning('请先添加表达式条件')
        return 
      }
      this.expression = exp.replace(/^\s+(AND)|(OR)|(NOT)\s+/,'').replace(/^\s+/,'')
    },
    additem(tp) {
      const arr = this[tp + 'addlist']
      arr.push({
        type: 'AND',
        value: ''
      })
    },
    additemdate(tp) {
      const arr = this[tp + 'addlist']
      arr.push({
        type: 'AND',
        value: {
          start: '',
          end: ''
        }
      })
    },
    delitem(tp, key) {
      const arr = this[tp + 'addlist']
      arr.splice(key, 1)
    },
    getcity() {
      this.$http.get(cityUrl).then(res => {
        console.log(res)
        this.options = res.data
      })
    },
    doshow() {
      console.log(11111)
    },
    qiehuan(num) {
      
      if (num === '1') {
        this.$router.push({ name: 'PatentSearchShiBei' })
      } 
      if (num === '2') {
        this.$router.push({ name: 'SeniorSearchShibei' })
      }
    },
    jiansuo() {
      const ret = this.getkeys()
      const re = ret.re
      const type = ret.type
      const queryobj = {}
      if (re.length) {
        const str = re.join(',')
        queryobj.dac = str
      }
      if (type.length) {
        const strt = type.join(',')
        queryobj.fKind = strt
      }
      queryobj.expression = this.expression.replace(/^\s+/,'')
      queryobj.searchType = 3
      if (!this.expression) {
          this.$message.warning('请生成表达式后检索')
          return
      }
      // const storagestr = JSON.stringify(queryobj)
      // localStorage.setItem('patentSearchConditions', storagestr)
      const url = '/#/search/patentsearch?' + this.objtostr(queryobj)
      window.open(url)
      // this.$router.push({ path: '/portal/search/patent-searchlist', query: queryobj })
    },
    objtostr(obj) {
      const arr = []
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          if (obj[k]) {
            const str = `${k}=${obj[k]}`
            arr.push(str)
          }
        }
      }
      return arr.join('&')
    },
    getkeys() {
      const re = []
      let type = []
      this.list.forEach(item => {
        if (item.ischeck) {
          re.push(item.value)
          if (item.checked && item.checked.length) {
            type = [...item.checked]
          }
        }
      })
      return { re, type }
    },
    dosome(it) {
      if (it.value === 'CN') {
        if (it.ischeck) {
          this.hasprovince = true
          const arr = []
          if (it['list'] && it['list'].length > 0) {
            it['list'].forEach(w => {
              arr.push(w['value'])
            })
          }
          it.checked = arr
        } else {
          this.hasprovince = false
          it.checked = []
        }
      }
    },
    isempty(obj) {
      for (var p in obj) {
        if (obj.hasOwnProperty(p)) {
          if (obj[p]) {
            return false
          }
        }
      }
      return true
    },
    resets() {
      this.cobj = { ...condition }
      this.date1 = ''
      this.date2 = ''
      this.sf = []
      this.checkall()
    },
    check(it) {
      if (it['checked'].length > 0) {
        it['ischeck'] = true
        this.hasprovince = true
      } else {
        it['ischeck'] = false
        this.hasprovince = false
      }
    },
    checkall() {
      if (this.all) {
        this.hasprovince = true
        this.list.forEach(item => {
          item.ischeck = this.all
          if (item.list) {
            item.list.forEach(it => {
              if (this.all) {
                item.checked.push(it.value)
              } else {
                item.checked = []
              }
            })
          }
        })
      }
    },
    sethover() {
      const sqh = document.querySelectorAll('.sqh')
      const sqhbox = document.querySelectorAll('.popbox')
      if (sqh) {
      const len = sqh.length

      for (let i = 0; i < len; i++) {
        let timer = null
        sqh[i].onmouseover = function() {
          clearTimeout(timer)
          sqhbox[i].style.display = 'block'
        }
        sqh[i].onmouseout = function() {
          timer = setTimeout(() => {
            sqhbox[i].style.display = 'none'
          }, 200)
          sqhbox[i].onmouseover = function() {
            clearTimeout(timer)
            this.style.display = 'block'
          }
          sqhbox[i].onmouseout = function() {
            timer = setTimeout(() => {
              this.style.display = 'none'
            }, 100)
          }
        }
      }
      }
    }
  },
  created() {
      // if (!judgeState()) {
      //   this.$router.replace({ name: 'PatentSearchShiBei' })
      // }
  },
  mounted() {
    window.scrollTo(0, 0)
    this.checkall()
    this.sethover()
  }
}
</script>

<style lang="less">
.countryiconbox {
  display: inline-block;
  width: 20px;
  height: 19px;
  padding: 2px 0;
  margin-right: 10px;
  margin-left: 5px;
  vertical-align: middle;
  img {
    width: 100%;
    height: 100%;
    vertical-align: top;
  }
}
.el-scrollbar__wrap {
  max-height: 600px;
}
.seniorsearchsebe {
  width: 1200px;
  margin: 0 auto;
  padding: 60px 40px;
  background-color: #fff;
  .helppicbox {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(51, 51, 51, 0.6);;
    z-index: 9999;
  }
  .helppic {
    position: absolute;
    width: 1138px;
    height: 356px;
    left: 50%;
    top: 50%;
    margin-left: -568px;
    margin-top: -178px;
    
    background-color: #fff;
    img {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
  .el-input {
    position: relative;
  }
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }
  h3,
  p {
    padding: 0;
    margin: 0;
  }
  .fl {
    float: left;
  }
  .fr {
    float: right;
  }
  .allzdbox {
    border: 1px solid #DCDCDC;
  }
  .bdstitle {
    padding: 20px ;
    border: 1px solid #DCDCDC;
    background-color: #f5f5f5;
    margin-bottom: 46px;
    > h3 {
      position: relative;
      height: 26px;
      line-height: 26px;
      margin-bottom: 30px;
      font-size: 18px;
      font-weight: 600;
      .more{
        position: absolute;
        top: 0px;
        right: 80px;
        width: 110px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #2F72D1;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
      }
      .different{
        position: absolute;
        top: 0px;
        right: 150px;
        width: 110px;
        height: 36px;
        line-height: 36px;
        text-align: center;
        color: #2F72D1;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
      }
      .help {
        position: absolute;
        right: 0;
        top: 3px;
        color: #2F72D1;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
        > span {
          vertical-align: middle;
        }
        .helpmark {
          display: inline-block;
          width: 16px;
          height: 16px;
          margin-left: 5px;
          border-radius: 50%;
          background-color: #2F72D1;
          color: #fff;
          text-align: center;
          line-height: 16px;
          
        }
      }
    }
    > p {
      // padding: 15px;
      // min-height: 58px;
      font-size: 14px;
      line-height: 24px;
      background-color: #fff;
      color: #333;
      margin-bottom: 25px;
    }
  }
  .bdsbtns {
    font-size: 0;
    > span {
      display: inline-block;
      margin-right: 10px;
      height: 36px;
      width: 110px;
      line-height: 36px;
      text-align: center;
      font-size: 14px;
      border-radius: 2px;
      cursor: pointer;
    }
    .jiansuo {
      background-color: #2F72D1;
      color: #fff;
    }
    .qingkong {
      color:#2F72D1;
      border: 1px solid #2F72D1;
    }
    .lishi {
      color: #2F72D1;
    }
    
  }
  .scbds {
    padding: 24px;
    overflow: hidden;
    .scbdsbtn {
      float: left;
      width: 100px;
      height: 30px;
      font-size: 14px;
      background-color: #2F72D1;
      color: #fff;
      cursor: pointer;
      text-align: center;
      line-height: 30px;
    }
  }
  .itemsearchtitle {
    position: relative;
    padding: 15px 0;
    font-size: 16px;
    font-weight: 600;
    .openorclose {
        position: absolute;
        right: 10px;
        top: 15px;
        color: #2F72D1;
        font-size: 14px;
        font-weight: normal;
        cursor: pointer;
    }
  }
  .itemsearch {
    padding: 0 10px;
    border-top: 1px solid #DCDCDC;
    border-bottom: 1px solid #DCDCDC;
    background-color: #f5f5f5;
    margin-bottom: 24px;
  }
  .itemsearchit {
    margin-bottom: 10px;
    // .el-select {
    //   height: 30px;
      
    // }
    // .el-input {
    //   height: 30px
    // }
    // .el-input__inner {
    //   height: 30px;
    // }
  }
  .itemsearcheach {
    width: 410px;
  }
  .itemsearcheachline {
    width: 100%;
  }
    .itemsearchlist > li {
      position: relative;
      height: 40px;
      vertical-align: middle;
      margin-bottom: 5px;
    }
    .itemsearchlabel {
      width: 100px;
      text-align: left;
      font-size: 14px;
      line-height: 40px;
    }
    .itemsearchtype {
      width: 90px;
      float: left;
    }
    .addbtn {
      float: left;
      width: 30px;
      height: 30px;
      margin-top: 5px;
      border-radius: 15px;
      background-color: #379dea;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      line-height: 25px;
      text-align: center;

    }
    .itemsearchval {
      width: 180px;
      margin-right: 10px;
      float: left;
    }
    .itemsearchvalline {
      float: left;
      width: 600px;
      margin-right: 10px;
      .start {
        width: 270px;
      }
      .zhi {
        width: 60px;
        line-height: 40px;
        text-align: center;
        font-size: 16px;
      }
      .end {
        width: 270px;
      }
    }
  
  .tabsbtn {
    margin-bottom: 20px;
    font-size: 0;
    > span {
      display: inline-block;
      width: 128px;
      height: 32px;
      line-height: 32px;
      text-align: center;
      background-color: #E9E9E9;
      color: #333;
      margin-right: 16px;
      font-size: 14px;
      cursor: pointer;
      &.active {
        background-color: #2F72D1;
        color: #fff;
      }
    }
  }
  .popbox {
    display: none;
    position: absolute;
    top: 44px;
    width: 100%;
    padding: 15px 10px;
    border-radius: 3px;
    background-color: #fff;
    font-size: 14px;
    box-shadow: 0 0 4px #ccc;
    color: #666;
    z-index: 9;
    > p {
      line-height: 20px;
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
  .el-cascader {
    width: 100%;
  }
  .result_typebox {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
    background-color: rgba(51, 51, 51, 0.6);
    .tablebox {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        width: 1200px;
        padding: 24px;
        min-height: 300px;
        background-color: #fff;
        .opbtns {
            font-size: 0;
            > span {
                display: inline-block;
                width: 60px;
                height: 24px;
                text-align: center;
                line-height: 24px;
                font-size: 14px;
            }
            .delbtn {
                margin-right: 35px;
                background-color: #f66;
                color: #fff;
                border-radius: 2px;
                cursor: pointer;
            }
            .join {
                text-align: right;
                margin-right: 5px;
                color: #333;
            }
            .andbtn {
                margin-right: 10px;
                background-color: #2F72D1;
                color: #fff;
                border-radius: 2px;
                cursor: pointer;
            }
            .orbtn {
                background-color: #E9E9E9;
                border: 2px;
                color: #333;
                cursor: pointer;
            }
        }
    }
    .historyclose {
        height: 20px;
        margin-bottom: 25px;
        font-size: 20px;
        color: #333;
        .el-icon-close {
            float: right;
            cursor: pointer;
        }
    }
    .result_type {
        width: 100%;
        margin-bottom: 70px;
        border: 1px solid #E9E9E9;
        border-collapse: collapse;
        .thead {
            height: 52px;
            line-height: 52px;
            background-color: #E9E9E9;
            color: #666;
            th {
                text-align: center;
            }
            .firstone {
                text-align: left;
            }
        }
        tr {
            border-bottom: 1px solid #E9E9E9;
            &:last-child {
                border-bottom: none;
            }
            td {
                max-width: 640px;
                padding: 0 5px;
                text-align: center;
                color: #333;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .firstone {
                text-align: left;
                padding-left: 20px;
            }
        }
        
        .tr-color tr {
            line-height: 50px;
        }
        
    }
  }
}
.seniorconditions {
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -moz-flex;
  display: -ms-flexbox;
  display: flex;
  justify-content: space-between;
  .countries {
    width: 200px;
    height: 360px;
    border: 1px solid #eee;
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
    .all {
      padding: 10px;
      border-bottom: 1px solid #eee;
    }
    .allcountry {
      padding: 10px;
    }
    .each {
      padding-bottom: 10px;
      &:first-child {
        border-bottom: 1px solid #eee;
      }
    }
  }
  .forms {
    width: 900px;
  }
  .el-date-editor.el-input {
    width: 100%;
  }
  .el-range-editor.el-input__inner {
    width: 100%;
  }
  .el-date-editor .el-range-separator {
    width: 20px;
  }
}
</style>

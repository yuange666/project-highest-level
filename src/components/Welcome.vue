<template>
    <div>
        <el-alert title="欢迎来到vue+vite+element plus项目！" type="success" effect="dark" />
        <div style="margin-top: 20px;">
            <el-button>Default</el-button>
            <el-button type="primary">Primary</el-button>
            <el-button type="success">Success</el-button>
            <el-button type="info">Info</el-button>
            <el-button type="warning">Warning</el-button>
            <el-button type="danger">Danger</el-button>
        </div>
        <el-input v-model="input" placeholder="Please input" style="margin-top: 20px;"/>
        <div style="margin-top: 20px;">
            <el-checkbox v-model="checked1" label="Option 1" size="large" />
            <el-checkbox v-model="checked2" label="Option 2" size="large" />
        </div>
        <el-table :data="tableData" style="width: 100%;margin-top: 20px;">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
        <div class="margin-top">
            <div>
                <el-button :loading="loading" type="primary" @click="getData">点击获取后台数据</el-button>
            </div>
            <div class="margin-top">
                接口数据：<span>{{serverData}}</span>
            </div>
        </div>
        <div>
            <div>
                <span>pinia数据(存储于localStorage)：{{ counter.count }}</span>
            </div>
            <div style="margin-top: 5px;">
                <el-button @click="counter.increment">点击增加</el-button>
            </div>    
        </div> 
    </div>
</template>

<script setup>
import { ref } from 'vue'
import API from '@/api/user.js';
import {useCounterStore} from '@/stores/counter';
const checked1 = ref(true)
const checked2 = ref(false)
const input = ref('')
const tableData = ref([
    {
        date: '2016-05-03',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-04',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
    },
]);
const loading=ref(false);
const serverData=ref('');
function getData() {
    loading.value=true;
    API.getTestData().then(res=>{
        serverData.value=JSON.stringify(res.data);
    }).finally(()=>{
        loading.value=false;
    })
}
const counter = useCounterStore();
</script>

<style scoped lang='scss'>
    .margin-top{
        margin-top: 20px;
    }
</style>
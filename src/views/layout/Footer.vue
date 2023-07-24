<template>
    <footer>
        <div class="footer_bg">
            <div class="footer_mold">
                <div class="footer_mold_top">
                    <div class="footer_mold_brandname">
                        <span>FoodFoot</span>
                    </div>
                    <div class="footer_callcenter_wrap">
                        <a><span>고객센터</span></a>
                        <!-- Top 스크롤 넣기 -->
                    </div>
                </div>
                <div class="footer_info">맛있는 발자취 풋풋!</div>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
}
</script>

<style scoped>
.footer_bg {
    width: 100%;
}

.footer_mold {
    width: 1050px;
    height: 100%;
    margin: 0 auto;
    position: relative;
}

.footer_mold_top {
    width: 1050px;
    height: 44px;
    padding-top: 40px;
}

.footer_mold_brandname {
    display: inline-block;
    align-items: center;
}

.footer_mold_brandname span {
    font-size: 35.5px;
    font-family: netmarbleM;
    font-weight: 700;
    color: #DBA901;
}

.footer_callcenter_wrap {
    width: 200px;
    float: right;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}

.footer_callcenter_wrap span {
    color: #979798;
    font-size: 16px;
}

.footer_info {
    margin-top: 50px;
    font-size: 15px;
    color: #979798;
    font-weight: 300;
}
</style>
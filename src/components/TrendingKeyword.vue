<template>
	<div class="trending-keyword-wrapper" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave">
		<!-- 기본 모드: 1개만 보여주기 -->
		<div v-if="!isHovered" class="current-keyword">
			🔥 {{ currentIndex + 1 }}위 {{ currentKeyword }}
		</div>

		<!-- hover 모드: 전체 리스트 보여주기 -->
		<div v-else class="all-keywords">
			<div v-for="(keyword, idx) in keywords" :key="idx" class="keyword-item">
				{{ idx + 1 }}위 {{ keyword }}
			</div>
		</div>
	</div>
</template>
  
<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

// 임시 데이터
const keywords = ref([
	'나이키 덩크',
	'뉴발란스 530',
	'젠틀몬스터 선글라스',
	'아디다스 이지부스트',
	'G-Shock',
	'Tissot PRX',
	'Casetify 핸드폰케이스',
	'나이키 에어포스',
	'로렉스 서브마리너',
	'오메가 씨마스터'
]);

const currentIndex = ref(0);
const currentKeyword = ref(keywords.value[0]);
const isHovered = ref(false);
let timer = null;

const startSlide = () => {
	timer = setInterval(() => {
		currentIndex.value = (currentIndex.value + 1) % keywords.value.length;
		currentKeyword.value = keywords.value[currentIndex.value];
	}, 3000);
};

const stopSlide = () => {
	clearInterval(timer);
};

// 급상승 검색어 마우스 접근 시 1위 ~ 10위 전체 검색어를 확인가능하고, 슬라이드 타이머값 초기화
const onMouseEnter = () => {
	isHovered.value = true;
	stopSlide();
};
const onMouseLeave = () => {
	isHovered.value = false;
	startSlide();
};

onMounted(() => {
	startSlide();
});

onBeforeUnmount(() => {
	stopSlide();
});
</script>

<style scoped>
.trending-keyword-wrapper {
	position: relative;
	width: 200px;
	height: 24px;
	/* overflow: hidden; */
	cursor: pointer;
}

.current-keyword {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	font-weight: bold;
	font-size: 14px;
	color: #333;
	height: 24px;
	line-height: 24px;
}

/* 전체 리스트 모드 */
.all-keywords {
	position: relative;
	top: -6px;
	left: 0;
	background: white;
	border: 1px solid #ddd;
	width: 100%;
	padding: 5px 10px;
	box-shadow: 0 2px 8px rgba(0,0,0,0.1);
	z-index: 10;
}

.keyword-item {
	font-size: 14px;
	font-weight: normal;
	color: #333;
	padding: 2px 0;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
  
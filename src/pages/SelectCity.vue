<template>
  <div class="mui-content">
    <div id='list' class="mui-indexed-list">
      <div class="mui-indexed-list-search mui-input-row mui-search">
        <input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索城市">
      </div>
      <div class="mui-indexed-list-bar">
        <a>#</a>
        <a>A</a>
        <a>B</a>
        <a>C</a>
        <a>D</a>
        <a>E</a>
        <a>F</a>
        <a>G</a>
        <a>H</a>
        <a>I</a>
        <a>J</a>
        <a>K</a>
        <a>L</a>
        <a>M</a>
        <a>N</a>
        <a>O</a>
        <a>P</a>
        <a>Q</a>
        <a>R</a>
        <a>S</a>
        <a>T</a>
        <a>U</a>
        <a>V</a>
        <a>W</a>
        <a>X</a>
        <a>Y</a>
        <a>Z</a>
      </div>
      <div class="mui-indexed-list-alert"></div>
      <div class="mui-indexed-list-inner">
        <div class="mui-indexed-list-empty-alert">没有数据</div>
        <ul class="mui-table-view">
          <city-item v-for="item in cityList" :name="item.Name" :list="item.city"></city-item>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import api from '../fetch/api'
import 'vue-awesome-mui/mui/examples/hello-mui/css/mui.indexedlist.css'
import CityItem from '@/components/CityItem'
export default {
  components: {
    CityItem
  },
  data() {
    return {
      cityList: []
    }
  },
  methods: {
    getCityList() {
      api.queryCity()
        .then(res => {
          console.log(res.numberData)
          this.cityList = res.numberData
        })
        .catch(err => {
          console.log(err)
        })
    },
    getIndexedList() {
      (function($, window, document) {

        var classSelector = function(name) {
          return '.' + $.className(name);
        }

        var IndexedList = $.IndexedList = $.Class.extend({
          /**
           * 通过 element 和 options 构造 IndexedList 实例
           **/
          init: function(holder, options) {
            var self = this;
            self.options = options || {};
            self.box = holder;
            if (!self.box) {
              throw "实例 IndexedList 时需要指定 element";
            }
            self.createDom();
            self.findElements();
            self.caleLayout();
            self.bindEvent();
          },
          createDom: function() {
            var self = this;
            self.el = self.el || {};
            //styleForSearch 用于搜索，此方式能在数据较多时获取很好的性能
            self.el.styleForSearch = document.createElement('style');
            (document.head || document.body).appendChild(self.el.styleForSearch);
          },
          findElements: function() {
            var self = this;
            self.el = self.el || {};
            self.el.search = self.box.querySelector(classSelector('indexed-list-search'));
            self.el.searchInput = self.box.querySelector(classSelector('indexed-list-search-input'));
            self.el.searchClear = self.box.querySelector(classSelector('indexed-list-search') + ' ' + classSelector('icon-clear'));
            self.el.bar = self.box.querySelector(classSelector('indexed-list-bar'));
            self.el.barItems = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-bar') + ' a'));
            self.el.inner = self.box.querySelector(classSelector('indexed-list-inner'));
            self.el.items = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-item')));
            self.el.liArray = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-inner') + ' li'));
            self.el.alert = self.box.querySelector(classSelector('indexed-list-alert'));
          },
          caleLayout: function() {
            var self = this;
            var withoutSearchHeight = (self.box.offsetHeight - self.el.search.offsetHeight) + 'px';
            self.el.bar.style.height = withoutSearchHeight;
            self.el.inner.style.height = withoutSearchHeight;
            var barItemHeight = ((self.el.bar.offsetHeight - 40) / self.el.barItems.length) + 'px';
            self.el.barItems.forEach(function(item) {
              item.style.height = barItemHeight;
              item.style.lineHeight = barItemHeight;
            });
          },
          scrollTo: function(group) {
            var self = this;
            var groupElement = self.el.inner.querySelector('[data-group="' + group + '"]');
            if (!groupElement || (self.hiddenGroups && self.hiddenGroups.indexOf(groupElement) > -1)) {
              return;
            }
            self.el.inner.scrollTop = groupElement.offsetTop;
          },
          bindBarEvent: function() {
            var self = this;
            var pointElement = null;
            var findStart = function(event) {
              if (pointElement) {
                pointElement.classList.remove('active');
                pointElement = null;
              }
              self.el.bar.classList.add('active');
              var point = event.changedTouches ? event.changedTouches[0] : event;
              pointElement = document.elementFromPoint(point.pageX, point.pageY);
              if (pointElement) {
                var group = pointElement.innerText;
                if (group && group.length == 1) {
                  pointElement.classList.add('active');
                  self.el.alert.innerText = group;
                  self.el.alert.classList.add('active');
                  self.scrollTo(group);
                }
              }
              event.preventDefault();
            };
            var findEnd = function(event) {
              self.el.alert.classList.remove('active');
              self.el.bar.classList.remove('active');
              if (pointElement) {
                pointElement.classList.remove('active');
                pointElement = null;
              }
            };
            self.el.bar.addEventListener($.EVENT_MOVE, function(event) {
              findStart(event);
            }, false);
            self.el.bar.addEventListener($.EVENT_START, function(event) {
              findStart(event);
            }, false);
            document.body.addEventListener($.EVENT_END, function(event) {
              findEnd(event);
            }, false);
            document.body.addEventListener($.EVENT_CANCEL, function(event) {
              findEnd(event);
            }, false);
          },
          search: function(keyword) {
            var self = this;
            keyword = (keyword || '').toLowerCase();
            var selectorBuffer = [];
            var groupIndex = -1;
            var itemCount = 0;
            var liArray = self.el.liArray;
            var itemTotal = liArray.length;
            self.hiddenGroups = [];
            var checkGroup = function(currentIndex, last) {
              if (itemCount >= currentIndex - groupIndex - (last ? 0 : 1)) {
                selectorBuffer.push(classSelector('indexed-list-inner li') + ':nth-child(' + (groupIndex + 1) + ')');
                self.hiddenGroups.push(liArray[groupIndex]);
              };
              groupIndex = currentIndex;
              itemCount = 0;
            }
            liArray.forEach(function(item) {
              var currentIndex = liArray.indexOf(item);
              if (item.classList.contains($.className('indexed-list-group'))) {
                checkGroup(currentIndex, false);
              } else {
                var text = (item.innerText || '').toLowerCase();
                var value = (item.getAttribute('data-value') || '').toLowerCase();
                var tags = (item.getAttribute('data-tags') || '').toLowerCase();
                if (keyword && text.indexOf(keyword) < 0 &&
                  value.indexOf(keyword) < 0 &&
                  tags.indexOf(keyword) < 0) {
                  selectorBuffer.push(classSelector('indexed-list-inner li') + ':nth-child(' + (currentIndex + 1) + ')');
                  itemCount++;
                }
                if (currentIndex >= itemTotal - 1) {
                  checkGroup(currentIndex, true);
                }
              }
            });
            if (selectorBuffer.length >= itemTotal) {
              self.el.inner.classList.add('empty');
            } else if (selectorBuffer.length > 0) {
              self.el.inner.classList.remove('empty');
              self.el.styleForSearch.innerText = selectorBuffer.join(', ') + "{display:none;}";
            } else {
              self.el.inner.classList.remove('empty');
              self.el.styleForSearch.innerText = "";
            }
          },
          bindSearchEvent: function() {
            var self = this;
            self.el.searchInput.addEventListener('input', function() {
              var keyword = this.value;
              self.search(keyword);
            }, false);
            $(self.el.search).on('tap', classSelector('icon-clear'), function() {
              self.search('');
            }, false);
          },
          bindEvent: function() {
            var self = this;
            self.bindBarEvent();
            self.bindSearchEvent();
          }
        });

        //mui(selector).indexedList 方式
        $.fn.indexedList = function(options) {
          //遍历选择的元素
          this.each(function(i, element) {
            if (element.indexedList) return;
            element.indexedList = new IndexedList(element, options);
          });
          return this[0] ? this[0].indexedList : null;
        };

      })(mui, window, document);
    }
  },
  created() {
    this.getCityList()
  },
  watch: {
    '$route'(to, from) {
      // 对路由变化作出响应...
      if (to.path === '/city/select' && (from.path === '/' || from.path === '/home')) {
        this.getCityList()
      }
    }
  },
  mounted() {
    this.getIndexedList()
    mui.init()
    mui.ready(function() {
      var header = document.querySelector('.header');
      var list = document.getElementById('list');
      //calc hieght
      list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
      //create
      window.indexedList = new mui.IndexedList(list);
    });
  }
}

</script>
<style lang="scss" scoped>
@import '../assets/css/function';

</style>

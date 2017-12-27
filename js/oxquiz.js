if (typeof (grandpa) === 'undefined') {grandpa = {};};
grandpa.oxquiz = {

    /*********************************************
	 * variable
	 *********************************************/
     _questionDivGroup : $('#questionDivGroup'),
     _questionSearchNoResult : $('#questionSearchNoResult'),
	/*********************************************
	 * ajax and Template
	 *********************************************/

	_template : {
        quiz: [
            '<div id="question-${no}" class="list-group-item border border-primary bg-light" style="display:none;">',
            '   <div class="row">',
            '       <div class="col-1 {{if a=="O"}}bg-primary{{/if}} {{if a=="X"}}bg-danger{{/if}} text-white text-center">${a}</div>',
            '       <div class="col-11 font-weight-bold">${q}</div>',
            '   </div>',
            '   {{if ex != ""}}',
            '   <div class="row">',
            '       <div class="col-12 font-italic">실제답: ${ex}</div>',
            '   </div>',
            '   {{/if}}',
            '</div>',
        ].join('')
    },
	_ajax : {},

	/*********************************************
	 * Initialize
	 *********************************************/

	/**
	 * @description default initializer
	 * */
	init : function() {
        this._renderQuiz();
        this._buildQuickSearchData();
        this.eventBind();
    },

	/**
	* @description event binding executer
	* @return void
	*/
	eventBind : function () {
        var _searchInputEl = $('#searchKeyword');
        _searchInputEl.on('keyup', $.proxy(this.handleSearchInputKeyup, this));
	},
	/**
	 * @description event un-binding executer
	 * @return void
	 */
	eventUnBind : function () {

	},

    _renderQuiz : function() {
        $.template("quizDiv", this._template.quiz);
        $.tmpl("quizDiv", grandpa.oxquiz.data).appendTo(this._questionDivGroup);
    },

    _buildQuickSearchData : function() {
        var _data = grandpa.oxquiz.data;
        $(_data).each(function(){
            this.quickSearch = this.q.replace(/\s/g, '').replace(/\./g, '').replace(/\'/g, '');
        });
    },

    doQuickSearch : function(keyword) {
        var matchResult = grandpa.oxquiz.data.filter(function(element, index, array){
            return element.quickSearch.match(keyword);
        });

        if(matchResult.length == 0) {
            this._questionSearchNoResult.show();
            return;
        }
        this._questionSearchNoResult.hide();
        matchResult.forEach(function(currentValue, index, array){
            $('#question-' + currentValue.no).show();
        });
    },


	/*********************************************
	 * Handler
	 *********************************************/
     handleSearchInputKeyup : function(evt) {
         $(this._questionDivGroup).children().hide();
         var keyword = evt.currentTarget.value;
         if(keyword && keyword.length > 1) {
             this.doQuickSearch(keyword);
         }
     }


};
$(document).ready(function() {
	grandpa.oxquiz.init();
});

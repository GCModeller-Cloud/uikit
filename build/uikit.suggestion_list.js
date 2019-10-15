var uikit;
(function (uikit) {
    var suggestion_list;
    (function (suggestion_list) {
        var render;
        (function (render) {
            /**
             * 将结果显示到网页上面
             *
             * @param div 带有#符号前缀的id查询表达式
            */
            function makeSuggestions(terms, div, click, top, caseInsensitive, divClass, addNew) {
                if (top === void 0) { top = 10; }
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                if (divClass === void 0) { divClass = null; }
                if (addNew === void 0) { addNew = null; }
                var suggestions = new suggestion_list.suggestion(terms);
                return function (input) {
                    showSuggestions(suggestions, input, div, click, top, caseInsensitive, addNew, divClass);
                };
            }
            render.makeSuggestions = makeSuggestions;
            function showSuggestions(suggestion, input, div, click, top, caseInsensitive, addNew, divClass) {
                if (top === void 0) { top = 10; }
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                if (addNew === void 0) { addNew = null; }
                if (divClass === void 0) { divClass = null; }
                var node = $ts(div);
                if (!node) {
                    return;
                }
                else {
                    node.clear();
                }
                suggestion.populateSuggestion(input, top, caseInsensitive)
                    .forEach(function (term) {
                    node.appendChild(listItem(term, divClass, click));
                });
                if ((!isNullOrUndefined(addNew)) && (!suggestion.hasEquals(input, caseInsensitive))) {
                    var addNewButton = $ts("<a>", {
                        href: executeJavaScript,
                        text: input,
                        title: input,
                        onclick: function () {
                            addNew(input);
                        }
                    }).display("add '" + input + "'");
                    node.append($ts("<div>", {
                        class: divClass
                    }).display(addNewButton));
                }
            }
            function listItem(term, divClass, click) {
                var a = $ts("<a>", {
                    href: executeJavaScript,
                    text: term.term,
                    title: term.term,
                    onclick: function () {
                        click(term);
                    }
                }).display(term.term);
                return $ts("<div>", { class: divClass }).display(a);
            }
        })(render = suggestion_list.render || (suggestion_list.render = {}));
    })(suggestion_list = uikit.suggestion_list || (uikit.suggestion_list = {}));
})(uikit || (uikit = {}));
/// <reference path="../../build/linq.d.ts" />
var uikit;
(function (uikit) {
    var suggestion_list;
    (function (suggestion_list) {
        var suggestion = /** @class */ (function () {
            function suggestion(terms) {
                this.terms = terms;
            }
            suggestion.prototype.hasEquals = function (input, caseInsensitive) {
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                if (!caseInsensitive) {
                    input = input.toLowerCase();
                }
                for (var _i = 0, _a = this.terms; _i < _a.length; _i++) {
                    var term_1 = _a[_i];
                    if (caseInsensitive) {
                        if (term_1.term.toLowerCase() == input) {
                            return true;
                        }
                    }
                    else {
                        if (term_1.term == input) {
                            return true;
                        }
                    }
                }
                return false;
            };
            /**
             * 返回最相似的前5个结果
            */
            suggestion.prototype.populateSuggestion = function (input, top, caseInsensitive) {
                if (top === void 0) { top = 5; }
                if (caseInsensitive === void 0) { caseInsensitive = false; }
                var lowerInput = input.toLowerCase();
                var scores = $from(this.terms)
                    .Select(function (q) {
                    var score = suggestion.getScore(q, input, lowerInput, caseInsensitive);
                    return {
                        term: q, score: score
                    };
                })
                    .OrderBy(function (rank) { return rank.score; });
                var result = scores
                    .Where(function (s) { return s.score != suggestion_list.NA; })
                    .Take(top)
                    .Select(function (s) { return s.term; })
                    .ToArray();
                if (result.length == top) {
                    return result;
                }
                else {
                    return suggestion.makeAdditionalSuggestion(scores, result, caseInsensitive, input, top);
                }
            };
            // 非NA得分的少于top的数量
            // 需要换一种方式计算结果，然后进行补充
            suggestion.makeAdditionalSuggestion = function (scores, result, caseInsensitive, input, top) {
                var lowerInput = input.toLowerCase();
                var addi = scores
                    .Skip(result.length)
                    .Select(function (s) {
                    var q = s.term;
                    var score;
                    if (caseInsensitive) {
                        score = Levenshtein.ComputeDistance(q.term.toLowerCase(), lowerInput);
                    }
                    else {
                        score = Levenshtein.ComputeDistance(q.term, input);
                    }
                    return {
                        term: q, score: score
                    };
                }).OrderBy(function (s) { return s.score; })
                    .Take(top - result.length)
                    .Select(function (s) { return s.term; })
                    .ToArray();
                return result.concat(addi);
            };
            suggestion.getScore = function (q, input, lowerInput, caseInsensitive) {
                if (caseInsensitive) {
                    // 大小写不敏感的模式下，都转换为小写
                    var lowerTerm = q.term.toLowerCase();
                    return suggestion_list.term.indexOf(lowerTerm, lowerInput);
                }
                else {
                    return q.dist(input);
                }
            };
            return suggestion;
        }());
        suggestion_list.suggestion = suggestion;
    })(suggestion_list = uikit.suggestion_list || (uikit.suggestion_list = {}));
})(uikit || (uikit = {}));
var uikit;
(function (uikit) {
    var suggestion_list;
    (function (suggestion_list) {
        suggestion_list.NA = 100000000000;
        /**
         * Term for suggestion
        */
        var term = /** @class */ (function () {
            /**
             * @param id 这个term在数据库之中的id编号
            */
            function term(id, term) {
                this.id = id;
                this.term = term;
            }
            /**
             * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
            */
            term.prototype.dist = function (input) {
                return term.indexOf(this.term, input);
            };
            term.indexOf = function (term, input) {
                var i = term.indexOf(input);
                if (i == -1) {
                    return suggestion_list.NA;
                }
                else {
                    return Math.abs(input.length - term.length);
                }
            };
            return term;
        }());
        suggestion_list.term = term;
    })(suggestion_list = uikit.suggestion_list || (uikit.suggestion_list = {}));
})(uikit || (uikit = {}));
//# sourceMappingURL=uikit.suggestion_list.js.map
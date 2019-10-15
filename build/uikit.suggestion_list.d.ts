/// <reference path="../../build/linq.d.ts" />
declare namespace uikit.suggestion_list.render {
    /**
     * 将结果显示到网页上面
     *
     * @param div 带有#符号前缀的id查询表达式
    */
    function makeSuggestions(terms: term[], div: string, click: (term: term) => void, top?: number, caseInsensitive?: boolean, divClass?: any, addNew?: ((newTerm: string) => void)): (input: string) => void;
}
declare namespace uikit.suggestion_list {
    class suggestion {
        private terms;
        constructor(terms: term[]);
        hasEquals(input: string, caseInsensitive?: boolean): boolean;
        /**
         * 返回最相似的前5个结果
        */
        populateSuggestion(input: string, top?: number, caseInsensitive?: boolean): term[];
        private static makeAdditionalSuggestion;
        private static getScore;
    }
}
declare namespace uikit.suggestion_list {
    const NA: number;
    /**
     * Term for suggestion
    */
    class term {
        id: number;
        term: string;
        /**
         * @param id 这个term在数据库之中的id编号
        */
        constructor(id: number, term: string);
        /**
         * 使用动态规划算法计算出当前的这个term和用户输入之间的相似度
        */
        dist(input: string): number;
        static indexOf(term: string, input: string): number;
    }
    interface scoreTerm {
        score: number;
        term: term;
    }
}

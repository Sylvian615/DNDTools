function attBuyFunc() {
    return {
        total_points: '25',
        remain_points: '25',
        att_name: ['力量','敏捷','体质','智力','感知','魅力'],
        att_value: new Array(6).fill(10),
        att_consumed: new Array(6).fill(0),
        valueSubOne() {
            this.att_value[this.index] -= 1
            this.mapAtt2Point()
            this.getRemainPoints()
        },
        valueAddOne() {
            this.att_value[this.index] += 1
            this.mapAtt2Point()
            this.getRemainPoints()

        },
        addBtnDisable() {return this.att_value[this.index] >= 18},
        subBtnDisable() {return this.att_value[this.index] <= 7},
        rstAttValue() {
            this.att_value = new Array(6).fill(10)
            this.remain_points = this.total_points
        },
        mapAtt2Point() {
            const mapping = [-4, -2, -1, 0, 1, 2, 3, 5, 7, 10, 13, 17]
            const point_idx = this.att_value[this.index] - 7
            this.att_consumed[this.index] = mapping[point_idx]
            /*        console.log(this.att_consumed[this.index])*/
        },
        getRemainPoints() {
            let acc = 0;
            this.att_consumed.forEach((item) => {acc += item})
            this.remain_points = this.total_points - acc
            /*        console.log(this.remain_points)*/
        },

    }
}
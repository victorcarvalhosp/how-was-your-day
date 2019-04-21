import {Component, OnInit} from '@angular/core';
import {Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';
import {Observable} from 'rxjs';
import {IEntry} from '../entries/models/entry';
import {select, Store} from '@ngrx/store';
import {AppState} from '../reducers';
import {EntriesRequested} from '../entries/actions/entries.actions';
import {isEntriesLoading, selectAllEntries} from '../entries/selectors/entries.selectors';
import {take} from 'rxjs/operators';
import {IMood} from '../moods/models/mood';

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

    loading$: Observable<boolean>;
    list$: Observable<IEntry[]>;

    // Doughnut
    public doughnutChartLabels: string[] = [];
    public doughnutChartMoods: IMood[] = [];

    public doughnutChartData: number[] = [350, 450, 100];
    public chartColors: any[] = [];
    public backgroundColor: string[] = [];
    public doughnutChartType = 'doughnut';
    public barChartOptions: any = {
        legend: {position: 'bottom'}
    };

    constructor(private store: Store<AppState>) {
    }

    ngOnInit() {
        this.store.dispatch(new EntriesRequested());
        this.loading$ = this.store.pipe(select(isEntriesLoading));
        this.list$ = this.store.pipe(select(selectAllEntries));
        this.populateChart();
    }

    populateChart() {
        this.list$.subscribe(entries => {
            this.doughnutChartLabels = [];
            this.doughnutChartData = [];
            this.doughnutChartMoods = [];
            this.backgroundColor = [];
            this.chartColors = [];
            if (entries.length > 0) {
                entries.forEach(entry => {
                        if (!this.arrayContainsMood(this.doughnutChartLabels, entry.mood.name)) {
                            this.doughnutChartLabels.push(entry.mood.name);
                            this.doughnutChartData.push(1);
                            this.doughnutChartMoods.push(entry.mood);
                            this.backgroundColor.push(entry.mood.color);
                        } else {
                            const index = this.doughnutChartLabels.indexOf(entry.mood.name);
                            this.doughnutChartData[index] = this.doughnutChartData[index] + 1;
                        }
                });
                this.chartColors.push({backgroundColor: this.backgroundColor});
            }
        });
    }

    arrayContainsMood(array, moodName) {
        return (array.indexOf(moodName) > -1);
    }

}

import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Chart } from 'chart.js';

@Component({
    selector: 'sb-charts-area',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './charts-area.component.html',
    styleUrls: ['charts-area.component.scss'],
})
export class ChartsAreaComponent implements OnInit, AfterViewInit {
    @ViewChild('myAreaChart') myAreaChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;

    constructor() {}
    ngOnInit() {}

    ngAfterViewInit() {
        this.chart = new Chart(this.myAreaChart.nativeElement, {
            type: 'line',
            data: {
                labels: [
                    'Mar 1',
                    'Mar 2',
                    'Mar 3',
                    'Mar 4',
                    'Mar 5',
                    'Mar 6',
                    'Mar 7',
                    'Mar 8',
                    'Mar 9',
                    'Mar 10',
                    'Mar 11',
                    'Mar 12',
                    'Mar 13',
                ],
                datasets: [
                    {
                        label: 'Sessions',
                        lineTension: 0.3,
                        backgroundColor: 'rgba(108,157,64,0.5)',
                        borderColor: 'rgba(108,157,64,1)',
                        pointRadius: 5,
                        pointBackgroundColor: 'rgba(101,50,179,1)',
                        pointBorderColor: 'rgba(101,50,179,1)',
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: 'rgba(101,50,179,1)',
                        pointHitRadius: 50,
                        pointBorderWidth: 2,
                        data: [
                            0,
                            100,
                            200,
                            300,
                            400,
                            500,
                            600,
                            700,
                            800,
                            900,
                            1000,
                            1100,
                            1200,
                            1300,
                            1400,
                            1500,
                            1600,
                            1700,
                        ],
                    },
                ],
            },
            options: {
                scales: {
                    xAxes: [
                        {
                            time: {
                                unit: 'day',
                            },
                            gridLines: {
                                display: false,
                            },
                            ticks: {
                                maxTicksLimit: 7,
                            },
                        },
                    ],
                    yAxes: [
                        {
                            ticks: {
                                min: 0,
                                max: 3000,
                                maxTicksLimit: 5,
                            },
                            gridLines: {
                                color: 'rgba(0, 0, 0, .125)',
                            },
                        },
                    ],
                },
                legend: {
                    display: false,
                },
            },
        });
    }
}

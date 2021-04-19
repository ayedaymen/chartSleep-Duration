import { Component, Input, OnInit } from '@angular/core';
import { Someil } from '../../_model/someil.model';
import { SommeilUserService } from '../../_service/sommeil-user.service';


@Component({

  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})

export class ChartComponent implements OnInit {
  @Input() cssClass: '';
  @Input() chartColor;
  chartOptions: any = {};
  fontFamily = '';
  colorsGrayGray500 = '';
  colorsGrayGray200 = '';
  colorsGrayGray300 = '';
  colorsThemeBaseDanger = '';
  myData: Someil[];
  loading:boolean;
  lastSleepDuration: number;
  average:number;
  constructor(private  sommeilUserService : SommeilUserService ){
    
   
  } 

  ngOnInit(): void {
    var sommeSleepDurations=0;

     this.sommeilUserService.getAllData().subscribe(e=>{
      this.myData=e;this.loading=false;
      
      const sleepDurations=[];
     const dates=[]
      this.myData.forEach(x => {
       
        var a=x.data.match(/^\d+|\d+\b|\d+(?=\w)/g)
       sleepDurations.push(a.toString().match(/\d+$/)[0]);
       sommeSleepDurations=parseFloat(a.toString().match(/\d+$/)[0])+sommeSleepDurations;
       
       var date = new Date(x.timestamp*1000).toLocaleString('default', { month: 'long' ,day:"2-digit",year:"numeric"});
       dates.push(date);      
       });
       this.lastSleepDuration = sleepDurations[sleepDurations.length -1]; 
       this.average=sommeSleepDurations/(sleepDurations.length+1)     
       this.chartOptions = this.getChartOptions(sleepDurations,dates);
 });
 


  }

  getChartOptions(data,date) {

    
    return {
      series: [{
        name: 'Sleep Duration',
        data:       data
      }, 
      ],
      chart: {
        type: 'bar',
        height: '200px',
        toolbar: {
          show: false
        },
        sparkline: {
          enabled: true
        },
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: ['60%'],
          endingShape: 'rounded'
        },
      },
      legend: {
        show: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['white']
      },
      xaxis: {
        categories: date,
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true
        },
        labels: {
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      yaxis: {
        min: 0,
        max: 20,
        labels: {
          style: {
            colors: this.colorsGrayGray500,
            fontSize: '12px',
            fontFamily: this.fontFamily
          }
        }
      },
      fill: {
        type: ['solid', 'solid'],
        opacity: [1, 1]
      },
      states: {
        normal: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        hover: {
          filter: {
            type: 'none',
            value: 0
          }
        },
        active: {
          allowMultipleDataPointsSelection: false,
          filter: {
            type: 'none',
            value: 0
          }
        }
      },
      tooltip: {
        style: {
          fontSize: '12px',
          fontFamily: this.fontFamily
        },
        y: {
          formatter: (val) => {
            return ` ${val} hours`;
          }
        },
        marker: {
          show: false
        }
      },
      colors: ['#ffffff', '#ffffff'],
      grid: {
        borderColor: this.colorsGrayGray200,
        strokeDashArray: 4,
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          left: 20,
          right: 20
        }
      }
    };
  }
}

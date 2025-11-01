import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { RouterLink } from "@angular/router";

import { NgxPaginationModule } from "ngx-pagination";

import { Event } from "../../models/event";
// import { EventDetails } from '../event-details/event-details';

import { DateGlobalizationPipe } from '../../../../shared/pipes/date-globalization-pipe';

import { EventsApi } from "../../services/events-api";


@Component({
  selector: 'app-events-list',
  imports: [CommonModule, FormsModule, /* EventDetails,*/ DateGlobalizationPipe, NgxPaginationModule, RouterLink],
  templateUrl: './events-list.html',
  styleUrl: './events-list.css'
})
export class EventsList implements OnInit {
  private _eventServiceSubscription: Subscription;
  private _eventsApi = inject(EventsApi);
  protected title: string = "Welcome To Bajaj Finserv Events List!";
  protected subTitle: string = "Published by Bajaj Finserv Hr Department!";
  protected columns: string[] = ["Event Code", "Event Name", "Start Date", "Fees", "Show Details", "Cancel Event"];
  protected events: Event[] = [];
  protected filteredEvents: Event[];
  protected searchChars: string = "";
  protected childSubTitle: string = "Details of Selected Event!";
  // protected selectedEvent: Event;
  // protected selectedEventId: number;
  protected childMessage: string;
  protected pageNumber: number = 1;
  protected pageSize: number = 2;
  private lastPageNumber: number;
  protected role: string | null;
  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role === 'Employee') {
      this.columns = this.columns.filter(col => col !== "Cancel Event");
    }
    this._eventServiceSubscription = this._eventsApi.getAllEvents().subscribe({
      next: eventsData => {
        console.log(eventsData);
        this.events = eventsData;
        this.filteredEvents = [...this.events];
      },
      error: err => {
        console.log(err);
      }
    })

  }

  protected handleChildMessage(message: string): void {
    this.childMessage = message;
  }
  // protected onEventSelection(id: number): void {
  //   this.selectedEventId = id;
  // }
  protected searchEvents(): void {
    if (!this.searchChars || this.searchChars == '') {
      this.filteredEvents = this.events;
      this.pageNumber = this.lastPageNumber;
      console.log(this.pageNumber + "  " + this.lastPageNumber);
    } else {
      this.filteredEvents = this.events.filter(event => event.eventName.toLocaleLowerCase().includes(this.searchChars.toLocaleLowerCase()));
      console.log(this.filteredEvents);
    }

    this.pageNumber = 1;
  }

  ngOnDestory(): void {
    if (this._eventServiceSubscription) {
      this._eventServiceSubscription.unsubscribe();
    }
  }
}

import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";


import { Event } from "../../models/event";

import { EventsApi } from "../../services/events-api";

@Component({
  selector: 'app-event-details',
  imports: [CommonModule],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css'
})
export class EventDetails implements OnInit, OnDestroy {
  private _eventsApi = inject(EventsApi);
  private _activatedRoute = inject(ActivatedRoute);
  private _eventsApiSubscription: Subscription;
  protected title: string = "Details Of - ";

  protected event: Event;

  ngOnInit(): void {
    let eventId = this._activatedRoute.snapshot.params['id'];
    this._activatedRoute.data.subscribe({
      next: data => {
        console.log(data);
      }
    });
    this._eventsApiSubscription = this._eventsApi.getEventDetails(eventId).subscribe({
      next: data => {
        this.event = data;
      }, error: err => {
        console.log(err);
      }
    });
  }
  ngOnDestroy(): void {
    if (this._eventsApiSubscription) {
      this._eventsApiSubscription.unsubscribe();
    }
  }

}

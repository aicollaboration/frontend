import { Component } from '@angular/core';

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: [
        './dashboard.component.scss',
    ],
})
export class DashboardComponent {
    public questions = [{
        question: 'What is AI and what can it do?',
        answer: '',
    }, {
        question: 'How AI can help us?',
        answer: '',
    }, {
        question: 'What should we implement first?',
        answer: '',
    }, {
        question: 'How does the implementation process work?',
        answer: '',
    }, {
        question: 'How can we shorten the time to MVP?',
        answer: '',
    }, {
        question: 'How can we shorten the time to market?',
        answer: '',
    }, {
        question: 'How can we share our innovation internally?',
        answer: '',
    }];
}

import { Component } from '@angular/core';
import { filter } from 'rxjs/operators';
import { SocketService } from 'services/socket.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
    selector: 'shell',
    templateUrl: './shell.component.html',
    styleUrls: ['./shell.component.scss']
})
export class ShellComponent {
    /**
     *
     */
    public ShowSplashScreen = true;

    /**
     *
     */
    public ShowGameCreation: boolean = false;

    /**
     *
     */
    public ShowOverlay: boolean = false;

    /**
     * Creates a new instance of the ShellComponent
     * @param socketService The Socket IO service wrapper
     */
    public constructor(private socketService: SocketService, private router: Router) {
        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe({
            next: (event) => {
                let navigationEnd = event as NavigationEnd;
                if (navigationEnd.url != '/') {
                    this.ShowSplashScreen = false;
                }
            }
        });
    }

    public HandleOverlayClick(event: MouseEvent): void {
        let element = event.target as HTMLElement;

        // only hide the modal if the click came from the background behind the dialog
        if (element.classList.contains('modal-overlay')) {
            this.ShowOverlay = false;
        }
    }
}

import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    imports: [MatButtonModule, MatInputModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatIconModule],
    exports: [MatButtonModule, MatInputModule, MatCardModule, MatSelectModule, MatProgressSpinnerModule, MatIconModule]
})
export class MaterialModule {}

import { NgModule } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
    imports: [MatButtonModule, MatInputModule, MatCardModule, MatSelectModule],
    exports: [MatButtonModule, MatInputModule, MatCardModule, MatSelectModule]
})
export class MaterialModule {}

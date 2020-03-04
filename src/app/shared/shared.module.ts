import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { PaginationComponent } from "./pagination/pagination.component";
import { CapitalizePipe } from "./pipes/capitalize.pipe";
import { TrimPipe } from "./pipes/trim.pipe";
import { FilterTextboxComponent } from "./filter-textbox/filter-textbox.component";
import { PromptComponent } from "./dialogs/prompt/prompt.component";
import { MaterialModule } from "./material.module";
import { ValidationService } from "./validation.service";

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
  declarations: [
    CapitalizePipe,
    TrimPipe,
    FilterTextboxComponent,
    PaginationComponent,
    PromptComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizePipe,
    TrimPipe,
    FilterTextboxComponent,
    PaginationComponent,
    PromptComponent
  ],
  entryComponents: [PromptComponent],
  providers: [ValidationService]
})
export class SharedModule {}

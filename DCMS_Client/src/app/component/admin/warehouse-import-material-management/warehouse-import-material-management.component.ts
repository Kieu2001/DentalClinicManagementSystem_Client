import { Component, OnInit } from '@angular/core';
import {NgbDateStruct} from "@ng-bootstrap/ng-bootstrap";
import {ImportMaterialService} from "../../../service/MaterialService/import-material.service";
import {ToastrService} from "ngx-toastr";
import {MaterialWarehouseService} from "../../../service/MaterialService/material-warehouse.service";
import {MaterialService} from "../../../service/MaterialService/material.service";

@Component({
  selector: 'app-warehouse-import-material-management',
  templateUrl: './warehouse-import-material-management.component.html',
  styleUrls: ['./warehouse-import-material-management.component.css']
})
export class WarehouseImportMaterialManagementComponent implements OnInit {
  model!:NgbDateStruct;
  constructor(private importMaterialService:ImportMaterialService,
              private materialWarehouseService:MaterialWarehouseService,
              private toastr:ToastrService,
              private materialService:MaterialService) { }
  importBills:any[]=[];
  pagingBill = {
    paging: 1,
    total: 0
  };
  displayWarehouse: any[] = [];
  total:number = 0;
  materbyId= {
    Id:'',
    CreateDate: '',
    Note: '',
    TotalAmount: 0,
    CreateBy: ''
  }
  importBillId:any;
  importBillObject:any;
  materialListByImportMaterialId:any[]=[];
  materialList:any[]=[];
  totalAmount: number = 0;
  loading:boolean = false;
  ngOnInit(): void {
    this.getImportMaterialBills(this.pagingBill.paging);
    this.getMaterials(this.pagingBill.paging);
  }

  getImportMaterialBills(paging: number) {
    this.loading = true;
    this.importMaterialService.getImportMaterials(paging).subscribe(data => {
      this.importBills = data.data;
      this.loading = false;
      this.importBills.forEach((p: any) => {
        let total = 0;
        this.materialWarehouseService.getMaterialsByImportMaterialBill(p.id).subscribe(data => {
          this.materialList = data.data;
          if (this.materialList.length != 0) {
            this.materialList.forEach((m: any) => {
              //this.materbyId.TotalAmount = this.materbyId.TotalAmount + (m.quantity_import * m.price * (1 - m.discount));
              total = total + (m.quantity_import * m.price * (1 - m.discount));
            })
          } else {
            total = 0;
          }
          this.materbyId.Id = p.id;
          this.materbyId.CreateDate = p.created_date;
          this.materbyId.CreateBy = p.creator;
          this.materbyId.Note = p.description;
          this.materbyId.TotalAmount = total;
          this.displayWarehouse.push(this.materbyId);
          total = 0;
          this.materbyId = {
            Id: '',
            CreateDate: '',
            Note: '',
            TotalAmount: 0,
            CreateBy: ''
          }
        })
      })
    })
  }
  getMaterials(paging:number){
    this.materialService.getMaterials(paging).subscribe(data=>{
      this.materialList = data.data;
      this.materialList.forEach((p:any) => {
        p.totalAmount += p.quantity_import*p.price*(1-p.discount);

      });
    })
  }


  calculateTotalAmountForBill(importBill:any) {
    let total = 0;
    // Tính tổng tiền dựa trên các sản phẩm trong phiếu nhập (hoặc cách tính tổng tiền của bạn)
    console.log(importBill.products);
    importBill.products.forEach((product:any) => {
      total += product.price * product.quantity_import;
      console.log(total);
    });
    return total;
  }
  openEditImportMaterial(id:any, importMaterialBill:any){
    console.log("Id", id);
    console.log("bill", importMaterialBill)
    this.importBillId = id;
    this.importBillObject = importMaterialBill;
  }
  pageChanged(event: number) {
    this.pagingBill.paging = event;
    this.getImportMaterialBills(this.pagingBill.paging);
  }
  getMaterialsImportMaterialBills(importMaterialBillId:any){
    this.materialWarehouseService.getMaterialsByImportMaterialBill(importMaterialBillId).subscribe(data=>{
      this.materialListByImportMaterialId = data.data;
      this.materialListByImportMaterialId.forEach((material:any) => {
          this.materialWarehouseService.deleteMaterialImportMaterial(material.material_warehouse_id).subscribe(data =>{
              this.toastr.success("Xoá thành công!");
            },
            error => {
              this.toastr.error("Xoá thất bại!");
            }
          )
        }
      )
      console.log(this.materialListByImportMaterialId)
    })
  }
  deleteImportMaterial(id:any){
    const cf = confirm("Bạn có muốn xóa phiếu nhập này không?");
    if(cf) {
      this.loading = true;
      this.getMaterialsImportMaterialBills(id);
      this.importMaterialService.deleteImportBill(id)
        .subscribe((res) => {
            this.toastr.success('Xóa phiếu nhập thành công!');
            /*const index = this.importBills.findIndex((importMaterial:any) => importMaterial.id === id);
            if (index !== -1) {
              this.importBills.splice(index, 1);
            }*/
            window.location.reload();
          },
          (err) => {
          this.loading = false;
            this.toastr.error('Xóa phiếu nhập thất bại!');
          }
        )
    }
  }
}

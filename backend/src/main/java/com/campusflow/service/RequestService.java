package com.campusflow.service;
import org.springframework.stereotype.Service; import com.campusflow.model.*; import com.campusflow.repository.CampusRequestRepository; import com.campusflow.dto.*;
@Service public class RequestService {
 private final CampusRequestRepository r;private final UserService u;public RequestService(CampusRequestRepository r,UserService u){this.r=r;this.u=u;}
 public CampusRequest create(String email,RequestCreateRequest x){User a=u.find(email);CampusRequest q=new CampusRequest();q.setRequesterId(a.getId());q.setRequesterName(a.getName());q.setRequesterEmail(a.getEmail());q.setRequesterRole(a.getRole());q.setDepartment(x.department());q.setLocation(x.location());q.setCategory(x.category());q.setSubject(x.subject());q.setDescription(x.description());q.setStatus(RequestStatus.PENDING);return r.save(q);}
 public java.util.List<CampusRequest> mine(String email){return r.findByRequesterId(u.find(email).getId());}
 public java.util.List<CampusRequest> all(){return r.findAll();}
 public CampusRequest status(String id,RequestStatusUpdate x,String admin){CampusRequest q=r.findById(id).orElseThrow(()->new RuntimeException("Request not found"));if(q.getStatus()==RequestStatus.RESOLVED||q.getStatus()==RequestStatus.DECLINED)throw new IllegalStateException("This request is already closed and cannot be changed");q.setStatus(x.status());q.setAdminComment(x.adminComment());q.setResolvedBy(admin);return r.save(q);}
 public long count(RequestStatus s){return r.findAll().stream().filter(x->x.getStatus()==s).count();}
}